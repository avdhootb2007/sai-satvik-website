import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Award, LogOut, Hotel, ShieldCheck, Globe } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onOpenOrderModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    user,
    activePortal,
    setActivePortal,
    setIsHotelAuthOpen,
    setIsManagerAuthOpen,
    setHotelAuthMode,
    setManagerAuthMode,
    logout
  } = useAuth();

  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '#hero', onClick: () => setActivePortal('none') },
    { name: t('categories'), href: '#categories', onClick: () => setActivePortal('none') },
    { name: t('products'), href: '#products', onClick: () => setActivePortal('none') },
    { name: t('whyUs'), href: '#why-us', onClick: () => setActivePortal('none') },
    { name: t('about'), href: '#about', onClick: () => setActivePortal('none') },
    { name: t('location'), href: '#location', onClick: () => setActivePortal('none') },
    { name: t('contact'), href: '#contact', onClick: () => setActivePortal('none') },
  ];

  return (
    <>
      {/* Top Banner Bar for Trust, Language Selector & Phone */}
      <div style={{
        backgroundColor: 'var(--color-primary-dark)',
        color: '#EBF5EE',
        fontSize: '0.85rem',
        padding: '0.4rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <Award size={15} style={{ color: 'var(--color-gold)' }} />
            <span>{t('bannerText')}</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} className="top-banner-right">
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              style={{
                backgroundColor: 'rgba(255,255,255,0.18)',
                color: 'var(--color-gold)',
                border: '1px solid var(--color-gold)',
                borderRadius: '4px',
                padding: '3px 10px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Globe size={14} />
              <span>{language === 'mr' ? 'English' : 'मराठी'}</span>
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.82rem' }}>
                  {user.role === 'dairy_manager' ? `${t('dairyManager')}:` : 'B2B Client:'} {user.business_name}
                </span>
                <button
                  onClick={logout}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <LogOut size={12} /> {t('logout')}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setHotelAuthMode('login');
                    setIsHotelAuthOpen(true);
                  }}
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-primary-dark)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '3px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Hotel Login
                </button>

                <button
                  onClick={() => {
                    setManagerAuthMode('login');
                    setIsManagerAuthOpen(true);
                  }}
                  style={{
                    backgroundColor: '#FEF3C7',
                    color: '#78350F',
                    border: '1px solid #F59E0B',
                    borderRadius: '4px',
                    padding: '3px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Manager Login
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(250, 248, 243, 0.96)' : 'var(--color-cream)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        transition: 'var(--transition-smooth)',
        borderBottom: '1px solid rgba(15, 90, 49, 0.08)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem' }}>
          
          {/* Brand Logo & Name */}
          <a 
            href="#hero" 
            onClick={() => setActivePortal('none')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}
          >
            <img 
              src="/sai-satvik-logo.png" 
              alt="Sai Satvik Dairy Products Logo" 
              style={{ height: '54px', width: 'auto', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="marathi-heading" style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--color-primary-dark)',
                lineHeight: 1.15
              }}>
                {language === 'mr' ? 'साई सात्विक' : 'Sai Satvik'}
              </span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: 'var(--color-granite)',
                textTransform: 'uppercase'
              }}>
                Dairy Products
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '1.25rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    onClick={link.onClick}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--color-granite-dark)',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      padding: '0.4rem 0.2rem',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-granite-dark)'}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right CTA: Separate Portal Buttons */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.6rem' }} className="desktop-cta">
            
            {/* Hotel / Resort B2B Portal Button */}
            <button
              onClick={() => {
                if (!user || user.role !== 'hotel_resort') {
                  setHotelAuthMode('login');
                  setIsHotelAuthOpen(true);
                } else {
                  setActivePortal(activePortal === 'hotel_resort' ? 'none' : 'hotel_resort');
                }
              }}
              style={{
                backgroundColor: activePortal === 'hotel_resort' ? 'var(--color-primary)' : '#FFFFFF',
                color: activePortal === 'hotel_resort' ? '#FFFFFF' : 'var(--color-primary-dark)',
                border: '1.5px solid var(--color-primary)',
                borderRadius: '8px',
                padding: '0.55rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <Hotel size={16} color={activePortal === 'hotel_resort' ? '#FFF' : 'var(--color-primary)'} />
              <span>{t('hotelPortal')}</span>
            </button>

            {/* Dairy Manager Portal Button */}
            <button
              onClick={() => {
                if (!user || user.role !== 'dairy_manager') {
                  setManagerAuthMode('login');
                  setIsManagerAuthOpen(true);
                } else {
                  setActivePortal(activePortal === 'dairy_manager' ? 'none' : 'dairy_manager');
                }
              }}
              style={{
                backgroundColor: activePortal === 'dairy_manager' ? '#78350F' : '#FEF3C7',
                color: activePortal === 'dairy_manager' ? '#FFFFFF' : '#92400E',
                border: '1.5px solid #F59E0B',
                borderRadius: '8px',
                padding: '0.55rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={16} />
              <span>{t('dairyManager')}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-primary-soft)',
              border: '1px solid rgba(15,90,49,0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.5rem',
              color: 'var(--color-primary)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Responsive CSS Helper Styles */}
        <style>{`
          @media (min-width: 992px) {
            .desktop-nav { display: block !important; }
            .desktop-cta { display: flex !important; }
            .mobile-hamburger { display: none !important; }
          }
          @media (max-width: 768px) {
            .top-banner-right { display: none !important; }
          }
        `}</style>

        {/* Mobile Slide Drawer */}
        {mobileMenuOpen && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1100,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              justify: 'flex-end'
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              style={{
                width: '85%',
                maxWidth: '340px',
                height: '100%',
                backgroundColor: 'var(--color-cream)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                boxShadow: 'var(--shadow-lg)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,90,49,0.1)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <img src="/sai-satvik-logo.png" alt="Sai Satvik" style={{ height: '40px' }} />
                  <span className="marathi-heading" style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>साई सात्विक</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-granite)' }}>
                  <X size={24} />
                </button>
              </div>

              {/* Language Switcher in Mobile Drawer */}
              <button
                onClick={toggleLanguage}
                style={{
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary-dark)',
                  border: '1px solid var(--color-primary)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Globe size={16} /> Language: {language === 'mr' ? 'English' : 'मराठी'}
              </button>

              {/* Portals Shortcuts in Mobile Menu */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (!user || user.role !== 'hotel_resort') {
                      setIsHotelAuthOpen(true);
                    } else {
                      setActivePortal('hotel_resort');
                    }
                  }}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFF',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 800,
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <Hotel size={18} /> {t('hotelPortal')}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (!user || user.role !== 'dairy_manager') {
                      setIsManagerAuthOpen(true);
                    } else {
                      setActivePortal('dairy_manager');
                    }
                  }}
                  style={{
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #F59E0B',
                    fontWeight: 800,
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <ShieldCheck size={18} /> {t('dairyManager')}
                </button>
              </div>

              {/* Links */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0, padding: 0 }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      onClick={() => {
                        link.onClick();
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'block',
                        padding: '0.6rem 0.75rem',
                        color: 'var(--color-granite-dark)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#FEE2E2',
                    color: '#991B1B',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {t('logout')}
                </button>
              )}

            </div>
          </div>
        )}
      </header>
    </>
  );
}
