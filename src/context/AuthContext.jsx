import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
            business_name: profile.business_name || 'Hotel Client',
            business_type: profile.business_type || 'hotel',
            contact_person: profile.contact_person || 'Manager',
            phone: profile.phone || '',
            address: profile.address || '',
            gst_number: profile.gst_number || ''
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

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (data?.user) {
          let { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          // Create default profile if first time
          if (!profile) {
            const userMeta = data.user.user_metadata || {};
            const defaultProfile = {
              id: data.user.id,
              email: data.user.email,
              role: userMeta.role || 'hotel_resort',
              business_name: userMeta.business_name || 'Hotel & Resort Client',
              business_type: userMeta.business_type || 'hotel',
              contact_person: userMeta.contact_person || 'Manager',
              phone: userMeta.phone || '',
              address: userMeta.address || '',
              gst_number: userMeta.gst_number || ''
            };
            await supabase.from('profiles').upsert([defaultProfile]);
            profile = defaultProfile;
          }

          const loggedUser = {
            id: data.user.id,
            email: data.user.email,
            role: profile.role || 'hotel_resort',
            business_name: profile.business_name || 'Hotel Client',
            business_type: profile.business_type || 'hotel',
            contact_person: profile.contact_person || 'Manager',
            phone: profile.phone || '',
            address: profile.address || '',
            gst_number: profile.gst_number || ''
          };
          setUser(loggedUser);
          setActivePortal(loggedUser.role === 'dairy_manager' ? 'dairy_manager' : 'hotel_resort');
        }
        setIsHotelAuthOpen(false);
      } catch (err) {
        let msg = err.message;
        if (msg === 'Invalid login credentials') {
          msg = 'Invalid email or password. Please double check your credentials and try again.';
        }
        setAuthError(msg);
      } finally {
        setLoading(false);
      }
    }
  };

  const registerHotel = async (formData) => {
    setLoading(true);
    setAuthError('');

    const { email, password, business_name, business_type, contact_person, phone, address, gst_number } = formData;

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'hotel_resort',
              business_name: business_name || 'Hotel Client',
              business_type: business_type || 'hotel',
              contact_person: contact_person || 'Manager',
              phone: phone || '',
              address: address || '',
              gst_number: gst_number || ''
            }
          }
        });

        if (error) throw error;

        // If session was not immediately issued, attempt direct login
        let sessionUser = data.session?.user || data.user;
        if (!data.session) {
          const loginRes = await supabase.auth.signInWithPassword({ email, password });
          if (loginRes.error && !loginRes.error.message.includes('User already registered')) {
            console.warn("Auto-signin warning:", loginRes.error);
          } else if (loginRes.data?.user) {
            sessionUser = loginRes.data.user;
          }
        }

        const profilePayload = {
          id: sessionUser.id,
          email,
          role: 'hotel_resort',
          business_name: business_name || 'Hotel Client',
          business_type: business_type || 'hotel',
          contact_person: contact_person || 'Manager',
          phone: phone || '',
          address: address || '',
          gst_number: gst_number || ''
        };

        await supabase.from('profiles').upsert([profilePayload]);

        setUser(profilePayload);
        setActivePortal('hotel_resort');
        setIsHotelAuthOpen(false);
      } catch (err) {
        let msg = err.message;
        if (msg.includes('User already registered')) {
          msg = 'An account with this email already exists. Please switch to Sign In.';
        }
        setAuthError(msg);
      } finally {
        setLoading(false);
      }
    }
  };

  // 2. DAIRY MANAGER AUTH HANDLERS
  const loginManager = async (email, password) => {
    setLoading(true);
    setAuthError('');

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (data?.user) {
          let { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          if (!profile) {
            const userMeta = data.user.user_metadata || {};
            const defaultProfile = {
              id: data.user.id,
              email: data.user.email,
              role: userMeta.role || 'dairy_manager',
              business_name: userMeta.business_name || 'Sai Satvik Main Office',
              business_type: 'dairy_manager',
              contact_person: userMeta.contact_person || 'Dairy Manager',
              phone: userMeta.phone || '9604988662',
              address: userMeta.address || 'Niphad, Nashik',
              gst_number: ''
            };
            await supabase.from('profiles').upsert([defaultProfile]);
            profile = defaultProfile;
          }

          const loggedUser = {
            id: data.user.id,
            email: data.user.email,
            role: profile.role || 'dairy_manager',
            business_name: profile.business_name || 'Dairy Manager Office',
            business_type: 'dairy_manager',
            contact_person: profile.contact_person || 'Manager',
            phone: profile.phone || '9604988662',
            address: profile.address || 'Takali, Niphad',
            gst_number: profile.gst_number || ''
          };
          setUser(loggedUser);
          setActivePortal('dairy_manager');
        }
        setIsManagerAuthOpen(false);
      } catch (err) {
        let msg = err.message;
        if (msg === 'Invalid login credentials') {
          msg = 'Invalid email or password. Please double check your credentials and try again.';
        }
        setAuthError(msg);
      } finally {
        setLoading(false);
      }
    }
  };

  const registerManager = async (formData) => {
    setLoading(true);
    setAuthError('');

    const { email, password, contact_person, phone } = formData;

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'dairy_manager',
              business_name: 'Sai Satvik Dairy Management Office',
              business_type: 'dairy_manager',
              contact_person: contact_person || 'Dairy Manager',
              phone: phone || '9604988662',
              address: 'Takali, Niphad, Nashik',
              gst_number: ''
            }
          }
        });

        if (error) throw error;

        let sessionUser = data.session?.user || data.user;
        if (!data.session) {
          const loginRes = await supabase.auth.signInWithPassword({ email, password });
          if (loginRes.error && !loginRes.error.message.includes('User already registered')) {
            console.warn("Auto-signin warning:", loginRes.error);
          } else if (loginRes.data?.user) {
            sessionUser = loginRes.data.user;
          }
        }

        const profilePayload = {
          id: sessionUser.id,
          email,
          role: 'dairy_manager',
          business_name: 'Sai Satvik Dairy Management Office',
          business_type: 'dairy_manager',
          contact_person: contact_person || 'Dairy Manager',
          phone: phone || '9604988662',
          address: 'Takali, Niphad, Nashik',
          gst_number: ''
        };

        await supabase.from('profiles').upsert([profilePayload]);

        setUser(profilePayload);
        setActivePortal('dairy_manager');
        setIsManagerAuthOpen(false);
      } catch (err) {
        let msg = err.message;
        if (msg.includes('User already registered')) {
          msg = 'An account with this email already exists. Please switch to Sign In.';
        }
        setAuthError(msg);
      } finally {
        setLoading(false);
      }
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
