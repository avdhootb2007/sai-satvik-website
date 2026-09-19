import React, { useState } from 'react';
import { X, User, Phone, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function ManagerAuthModal() {
  const {
    isManagerAuthOpen,
    setIsManagerAuthOpen,
    managerAuthMode,
    setManagerAuthMode,
    loginManager,
    registerManager,
    loading,
    authError
  } = useAuth();

  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    contact_person: '',
    phone: ''
  });

  if (!isManagerAuthOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (managerAuthMode === 'login') {
      loginManager(formData.email, formData.password);
    } else {
      registerManager(formData);
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
        maxWidth: '480px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        position: 'relative',
        border: '2px solid #F59E0B'
      }}>
        {/* Header Banner */}
        <div style={{
          backgroundColor: '#78350F',
          color: '#FFFFFF',
          padding: '1.5rem',
          borderTopLeftRadius: '14px',
          borderTopRightRadius: '14px',
          position: 'relative'
        }}>
          <button 
            onClick={() => setIsManagerAuthOpen(false)}
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
            <ShieldCheck size={32} color="#F59E0B" />
            <div>
              <h3 className="marathi-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                {language === 'mr' ? 'डेअरी मॅनेजर डॅशबोर्ड' : 'Dairy Manager Admin Portal'}
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#FCD34D', fontWeight: 600 }}>
                {language === 'mr' ? 'डेअरी मॅनेजर व स्टाफसाठी स्वतंत्र लॉगिन व नोंदणी' : 'Dedicated Dairy Operations & Management Auth'}
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
              onClick={() => setManagerAuthMode('login')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: managerAuthMode === 'login' ? '#F59E0B' : 'transparent',
                color: managerAuthMode === 'login' ? '#78350F' : '#EBF5EE',
                transition: 'all 0.2s ease'
              }}
            >
              {t('signIn')}
            </button>
            <button
              type="button"
              onClick={() => setManagerAuthMode('register')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: managerAuthMode === 'register' ? '#F59E0B' : 'transparent',
                color: managerAuthMode === 'register' ? '#78350F' : '#EBF5EE',
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

          {/* Manager Email */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
              {language === 'mr' ? 'मॅनेजर ई-मेल आयडी (Manager Email)' : 'Manager Email Address'} *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="manager@saisatvik.com"
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

          {/* Manager Password */}
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
          {managerAuthMode === 'register' && (
            <>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', display: 'block' }}>
                  {language === 'mr' ? 'मॅनेजर नाव (Manager Name)' : 'Manager Full Name'} *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9CA3AF' }} />
                  <input
                    type="text"
                    name="contact_person"
                    required
                    value={formData.contact_person}
                    onChange={handleChange}
                    placeholder="Pramod Patil"
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
                    placeholder="9604988662"
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
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              backgroundColor: '#78350F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(120,53,15,0.3)',
              marginTop: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            {loading 
              ? 'Processing...' 
              : managerAuthMode === 'login' ? `${t('signIn')} (Manager)` : `${t('submitRegister')} (Manager)`}
          </button>

        </form>
      </div>
    </div>
  );
}
