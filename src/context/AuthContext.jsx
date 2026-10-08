import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, saveStoredRegisteredHotel } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sai_satvik_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activePortal, setActivePortal] = useState('none');
  const [isHotelAuthOpen, setIsHotelAuthOpen] = useState(false);
  const [isManagerAuthOpen, setIsManagerAuthOpen] = useState(false);
  const [hotelAuthMode, setHotelAuthMode] = useState('login'); // 'login' | 'register'
  const [managerAuthMode, setManagerAuthMode] = useState('login'); // 'login' | 'register'
  
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('sai_satvik_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sai_satvik_user');
    }
  }, [user]);

  // Listen to live Supabase Auth session changes
  useEffect(() => {
    if (!supabase) return;

    const fetchProfile = async (sessionUser) => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .maybeSingle();

        if (profile) {
          const fullUser = {
            id: sessionUser.id,
            email: sessionUser.email,
            role: profile.role || 'hotel_resort',
            business_name: profile.business_name || sessionUser.user_metadata?.business_name || 'B2B Client',
            business_type: profile.business_type || sessionUser.user_metadata?.business_type || 'hotel',
            contact_person: profile.contact_person || sessionUser.user_metadata?.contact_person || '',
            phone: profile.phone || sessionUser.user_metadata?.phone || '',
            address: profile.address || sessionUser.user_metadata?.address || '',
            gst_number: profile.gst_number || sessionUser.user_metadata?.gst_number || '',
            status: profile.status || sessionUser.user_metadata?.status || 'pending',
            is_permitted: Boolean(profile.is_permitted || sessionUser.user_metadata?.is_permitted)
          };
          setUser(fullUser);
          if (activePortal === 'none') {
            setActivePortal(profile.role === 'dairy_manager' ? 'dairy_manager' : 'hotel_resort');
          }
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setActivePortal('none');
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  // 1. HOTEL & RESORT AUTH HANDLERS
  const loginHotel = async (email, password) => {
    setLoading(true);
    setAuthError('');

    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (data?.user) {
          let { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          const userRole = profile?.role || data.user.user_metadata?.role;

          // Reject dairy manager accounts attempting to login via Hotel B2B portal
          if (userRole === 'dairy_manager') {
            await supabase.auth.signOut();
            setUser(null);
            setActivePortal('none');
            throw new Error('Invalid account type for Hotel B2B portal. Please sign in via Dairy Manager login.');
          }

          // Create default profile if first time
          const userMeta = data.user.user_metadata || {};
          if (!profile) {
            const defaultProfile = {
              id: data.user.id,
              email: data.user.email,
              role: userMeta.role || 'hotel_resort',
              business_name: userMeta.business_name || 'B2B Client',
              business_type: userMeta.business_type || 'hotel',
              contact_person: userMeta.contact_person || '',
              phone: userMeta.phone || '',
              address: userMeta.address || '',
              gst_number: userMeta.gst_number || '',
              status: userMeta.status || 'pending',
              is_permitted: Boolean(userMeta.is_permitted)
            };
            try {
              await supabase.from('profiles').upsert([defaultProfile]);
            } catch (e) {
              console.warn("Profile upsert notice:", e);
            }
            profile = defaultProfile;
          }

          const loggedUser = {
            id: data.user.id,
            email: data.user.email,
            role: profile.role || 'hotel_resort',
            business_name: profile.business_name || userMeta.business_name || 'B2B Client',
            business_type: profile.business_type || userMeta.business_type || 'hotel',
            contact_person: profile.contact_person || userMeta.contact_person || '',
            phone: profile.phone || userMeta.phone || '',
            address: profile.address || userMeta.address || '',
            gst_number: profile.gst_number || userMeta.gst_number || '',
            status: profile.status || userMeta.status || 'pending',
            is_permitted: Boolean(profile.is_permitted || userMeta.is_permitted)
          };
          saveStoredRegisteredHotel(loggedUser);
          setUser(loggedUser);
          setActivePortal('hotel_resort');
          setIsHotelAuthOpen(false);
        }
      } else {
        const localUser = {
          id: 'hotel-' + Date.now(),
          email: email,
          role: 'hotel_resort',
          business_name: 'B2B Hotel',
          business_type: 'hotel',
          contact_person: email.split('@')[0],
          phone: '',
          address: '',
          gst_number: '',
          status: 'pending',
          is_permitted: false
        };
        saveStoredRegisteredHotel(localUser);
        setUser(localUser);
        setActivePortal('hotel_resort');
        setIsHotelAuthOpen(false);
      }
    } catch (err) {
      let msg = err.message || 'Authentication failed.';
      if (msg === 'Invalid login credentials' || msg === 'Invalid email or password.') {
        msg = 'Invalid email or password. Please double check your credentials and try again.';
      }
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  const registerHotel = async (formData) => {
    setLoading(true);
    setAuthError('');

    const { email, password, business_name, business_type, contact_person, phone, address, gst_number } = formData;

    try {
      if (supabase) {
        // Step 1: Sign up the user in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'hotel_resort',
              business_name: business_name || 'B2B Client',
              business_type: business_type || 'hotel',
              contact_person: contact_person || '',
              phone: phone || '',
              address: address || '',
              gst_number: gst_number || '',
              status: 'pending',
              is_permitted: false
            }
          }
        });

        if (error) throw error;

        // Get user from either session (auto-confirmed) or identities (email confirmation pending)
        const signedUpUser = data.session?.user || data.user;

        if (!signedUpUser || !signedUpUser.id) {
          throw new Error('Registration did not return a valid user. Please try again.');
        }

        // Check if this is a duplicate signup (user exists but identities is empty)
        if (signedUpUser.identities && signedUpUser.identities.length === 0) {
          throw new Error('An account with this email already exists. Please switch to Sign In.');
        }

        // Step 2: Insert profile into profiles table IMMEDIATELY
        // Use the user ID from signUp (works even before email confirmation)
        const profilePayload = {
          id: signedUpUser.id,
          email,
          role: 'hotel_resort',
          business_name: business_name || 'B2B Client',
          business_type: business_type || 'hotel',
          contact_person: contact_person || '',
          phone: phone || '',
          address: address || '',
          gst_number: gst_number || '',
          status: 'pending',
          is_permitted: false
        };

        const { error: upsertErr } = await supabase.from('profiles').upsert([profilePayload]);
        if (upsertErr) {
          console.error("Profile upsert failed:", upsertErr);
          // Don't throw - auth user is already created, profile insert is secondary
        }

        // Step 3: Try to auto-login if no session yet (email might already be confirmed)
        let hasSession = Boolean(data.session);
        if (!hasSession) {
          try {
            const loginRes = await supabase.auth.signInWithPassword({ email, password });
            if (loginRes.data?.session) {
              hasSession = true;
            }
          } catch (loginErr) {
            // Email confirmation is likely required - this is expected
            console.log("Auto-login after signup skipped (email confirmation may be pending)");
          }
        }

        saveStoredRegisteredHotel(profilePayload);
        setUser(profilePayload);
        setActivePortal('hotel_resort');
        setIsHotelAuthOpen(false);
      } else {
        const localUser = {
          id: 'hotel-' + Date.now(),
          email,
          role: 'hotel_resort',
          business_name: business_name || 'B2B Client',
          business_type: business_type || 'hotel',
          contact_person: contact_person || '',
          phone: phone || '',
          address: address || '',
          gst_number: gst_number || '',
          status: 'pending',
          is_permitted: false,
          created_at: new Date().toISOString()
        };
        saveStoredRegisteredHotel(localUser);
        setUser(localUser);
        setActivePortal('hotel_resort');
        setIsHotelAuthOpen(false);
      }
    } catch (err) {
      let msg = err.message || 'Registration failed.';
      if (msg.includes('User already registered')) {
        msg = 'An account with this email already exists. Please switch to Sign In.';
      }
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  // 2. DAIRY MANAGER AUTH HANDLERS
  const loginManager = async (email, password) => {
    setLoading(true);
    setAuthError('');

    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (data?.user) {
          let { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          const userRole = profile?.role || data.user.user_metadata?.role;

          // Reject non-manager credentials attempting to login via Manager portal
          if (userRole !== 'dairy_manager') {
            await supabase.auth.signOut();
            setUser(null);
            setActivePortal('none');
            throw new Error('Invalid account type. Access restricted to Dairy Managers.');
          }

          if (!profile) {
            const userMeta = data.user.user_metadata || {};
            const defaultProfile = {
              id: data.user.id,
              email: data.user.email,
              role: 'dairy_manager',
              business_name: userMeta.business_name || 'Sai Satvik Main Office',
              business_type: 'dairy_manager',
              contact_person: userMeta.contact_person || 'Dairy Manager',
              phone: userMeta.phone || '9604988662',
              address: userMeta.address || 'Niphad, Nashik',
              gst_number: ''
            };
            try {
              await supabase.from('profiles').upsert([defaultProfile]);
            } catch (e) {
              console.warn("Profile upsert notice:", e);
            }
            profile = defaultProfile;
          }

          const loggedUser = {
            id: data.user.id,
            email: data.user.email,
            role: 'dairy_manager',
            business_name: profile.business_name || 'Dairy Manager Office',
            business_type: 'dairy_manager',
            contact_person: profile.contact_person || 'Manager',
            phone: profile.phone || '9604988662',
            address: profile.address || 'Takali, Niphad',
            gst_number: profile.gst_number || ''
          };
          setUser(loggedUser);
          setActivePortal('dairy_manager');
          setIsManagerAuthOpen(false);
        }
      } else {
        const localManager = {
          id: 'manager-' + Date.now(),
          email: email,
          role: 'dairy_manager',
          business_name: 'Sai Satvik Dairy Management Office',
          business_type: 'dairy_manager',
          contact_person: email.split('@')[0],
          phone: '',
          address: 'Niphad, Nashik',
          gst_number: ''
        };
        setUser(localManager);
        setActivePortal('dairy_manager');
        setIsManagerAuthOpen(false);
      }
    } catch (err) {
      let msg = err.message || 'Authentication failed.';
      if (msg === 'Invalid login credentials' || msg === 'Invalid email or password.') {
        msg = 'Invalid email or password. Please double check your credentials and try again.';
      }
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  const registerManager = async (formData) => {
    setLoading(true);
    setAuthError('');

    const { email, password, contact_person, phone } = formData;

    try {
      if (supabase) {
        // Step 1: Sign up the manager in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'dairy_manager',
              business_name: 'Sai Satvik Dairy Management Office',
              business_type: 'dairy_manager',
              contact_person: contact_person || 'Dairy Manager',
              phone: phone || '',
              address: 'Takali, Niphad, Nashik',
              gst_number: ''
            }
          }
        });

        if (error) throw error;

        const signedUpUser = data.session?.user || data.user;

        if (!signedUpUser || !signedUpUser.id) {
          throw new Error('Registration did not return a valid user. Please try again.');
        }

        // Check if this is a duplicate signup (user exists but identities is empty)
        if (signedUpUser.identities && signedUpUser.identities.length === 0) {
          throw new Error('An account with this email already exists. Please switch to Sign In.');
        }

        // Step 2: Insert profile into profiles table IMMEDIATELY
        const profilePayload = {
          id: signedUpUser.id,
          email,
          role: 'dairy_manager',
          business_name: 'Sai Satvik Dairy Management Office',
          business_type: 'dairy_manager',
          contact_person: contact_person || 'Dairy Manager',
          phone: phone || '',
          address: 'Takali, Niphad, Nashik',
          gst_number: '',
          status: 'approved',
          is_permitted: true
        };

        const { error: upsertErr } = await supabase.from('profiles').upsert([profilePayload]);
        if (upsertErr) {
          console.error("Manager profile upsert failed:", upsertErr);
        }

        // Step 3: Try to auto-login if no session yet
        let hasSession = Boolean(data.session);
        if (!hasSession) {
          try {
            const loginRes = await supabase.auth.signInWithPassword({ email, password });
            if (loginRes.data?.session) {
              hasSession = true;
            }
          } catch (loginErr) {
            console.log("Auto-login after signup skipped (email confirmation may be pending)");
          }
        }

        setUser(profilePayload);
        setActivePortal('dairy_manager');
        setIsManagerAuthOpen(false);
      } else {
        const localManager = {
          id: 'manager-' + Date.now(),
          email,
          role: 'dairy_manager',
          business_name: 'Sai Satvik Dairy Management Office',
          business_type: 'dairy_manager',
          contact_person: contact_person || 'Dairy Manager',
          phone: phone || '',
          address: 'Takali, Niphad, Nashik',
          gst_number: ''
        };
        setUser(localManager);
        setActivePortal('dairy_manager');
        setIsManagerAuthOpen(false);
      }
    } catch (err) {
      let msg = err.message || 'Registration failed.';
      if (msg.includes('User already registered')) {
        msg = 'An account with this email already exists. Please switch to Sign In.';
      }
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setActivePortal('none');
  };

  return (
    <AuthContext.Provider value={{
      user,
      activePortal,
      setActivePortal,
      isHotelAuthOpen,
      setIsHotelAuthOpen,
      isManagerAuthOpen,
      setIsManagerAuthOpen,
      hotelAuthMode,
      setHotelAuthMode,
      managerAuthMode,
      setManagerAuthMode,
      loading,
      authError,
      setAuthError,
      loginHotel,
      registerHotel,
      loginManager,
      registerManager,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
