import React, { useState } from 'react';
import { X, Building2, User, Phone, MapPin, Lock, Mail, Hotel } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function HotelAuthModal() {
  const {
    isHotelAuthOpen,
    setIsHotelAuthOpen,
    hotelAuthMode,
    setHotelAuthMode,
    loginHotel,
    registerHotel,
    loading,
    authError
  } = useAuth();

  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    business_name: '',
    business_type: 'hotel',
    contact_person: '',
    phone: '',
    address: '',
    gst_number: ''
  });

  if (!isHotelAuthOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hotelAuthMode === 'login') {
      loginHotel(formData.email, formData.password);
    } else {
      registerHotel(formData);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        position: 'relative',
        border: '2px solid var(--color-primary)'
      }}>
        {/* Header Banner */}
        <div style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#FFFFFF',
          padding: '1.5rem',
          borderTopLeftRadius: '14px',
          borderTopRightRadius: '14px',
          position: 'relative'
        }}>
          <button 
            onClick={() => setIsHotelAuthOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Hotel size={32} color="var(--color-gold)" />
            <div>
              <h3 className="marathi-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                {language === 'mr' ? 'हॉटेल व रिसॉर्ट B2B पोर्टल' : 'Hotel & Resort B2B Portal'}
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                {language === 'mr' ? 'व्यावसायिक ग्राहकांसाठी स्वतंत्र लॉगिन व नोंदणी' : 'Dedicated B2B Commercial Client Registration & Login'}
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '4px',
            marginTop: '1rem'
          }}>
            <button
              type="button"
              onClick={() => setHotelAuthMode('login')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: hotelAuthMode === 'login' ? 'var(--color-gold)' : 'transparent',
                color: hotelAuthMode === 'login' ? 'var(--color-primary-dark)' : '#EBF5EE',
                transition: 'all 0.2s ease'
              }}
            >
              {t('signIn')}
            </button>
            <button
              type="button"
              onClick={() => setHotelAuthMode('register')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: hotelAuthMode === 'register' ? 'var(--color-gold)' : 'transparent',
                color: hotelAuthMode === 'register' ? 'var(--color-primary-dark)' : '#EBF5EE',
                transition: 'all 0.2s ease'
              }}
            >
              {t('register')}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          {authError && (
            <div style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#991B1B',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600
            }}>
              {authError}
            </div>
          )}

          {/* Email */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
              {t('emailLabel')} *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="hotel@saipalace.com"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
              {t('passwordLabel')} *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="******"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          {/* Registration Fields */}
          {hotelAuthMode === 'register' && (
            <>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
                  {t('businessNameLabel')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
                  <input
                    type="text"
                    name="business_name"
                    required
                    value={formData.business_name}
                    onChange={handleChange}
                    placeholder="Hotel Sai Palace Resort"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
                    {t('contactPersonLabel')} *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
                    <input
                      type="text"
                      name="contact_person"
                      required
                      value={formData.contact_person}
                      onChange={handleChange}
                      placeholder="Manager Name"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
                    {t('phoneLabel')} *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10 Digit Phone"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
                  {t('addressLabel')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Niphad Phata, Nashik"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
                  {t('gstLabel')}
                </label>
                <input
                  type="text"
                  name="gst_number"
                  value={formData.gst_number}
                  onChange={handleChange}
                  placeholder="27AAAAA0000A1Z5"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(15,90,49,0.3)',
              marginTop: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            {loading 
              ? 'Processing...' 
              : hotelAuthMode === 'login' ? `${t('signIn')} (Hotel B2B)` : `${t('submitRegister')} (Hotel B2B)`}
          </button>

        </form>
      </div>
    </div>
  );
}
