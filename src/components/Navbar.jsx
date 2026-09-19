import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ShoppingBag, MapPin, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export default function Navbar({ onOpenOrderModal, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'मुख्य (Home)', href: '#hero' },
    { name: 'श्रेणी (Categories)', href: '#categories' },
    { name: 'उत्पादने (Products)', href: '#products' },
    { name: 'खासियत (Why Us)', href: '#why-us' },
    { name: 'आमच्याबद्दल (About)', href: '#about' },
    { name: 'पत्ता (Location)', href: '#location' },
    { name: 'संपर्क (Contact)', href: '#contact' },
  ];

  return (
    <>
      {/* Top Banner Bar for Trust & Quick Phone */}
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
            <span>१००% शुद्ध सात्विक ताजे दूध व पारंपारिक मिठाई | निफाड, नाशिक</span>
          </div>
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }} className="top-banner-right">
            <a href={`tel:${BUSINESS_INFO.primaryPhone}`} style={{ color: '#EBF5EE', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <Phone size={14} style={{ color: 'var(--color-gold)' }} />
              <span>{BUSINESS_INFO.primaryPhone}</span>
            </a>
            <span style={{ opacity: 0.4 }}>|</span>
            <a href={`tel:${BUSINESS_INFO.phones[1]}`} style={{ color: '#EBF5EE', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <span>{BUSINESS_INFO.phones[1]}</span>
            </a>
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
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
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
                साई सात्विक
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
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    style={{
                      textDecoration: 'none',
                      color: 'var(--color-granite-dark)',
                      fontWeight: 600,
                      fontSize: '0.98rem',
                      padding: '0.5rem 0.25rem',
                      transition: 'var(--transition-fast)',
                      position: 'relative'
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

          {/* Desktop Right CTA */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="desktop-cta">
            <button 
              onClick={() => onOpenOrderModal()}
              className="btn btn-whatsapp"
              style={{ fontSize: '0.92rem', padding: '0.65rem 1.3rem' }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp वर ऑर्डर करा</span>
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

        {/* Responsive CSS Helper Styles injected inline for breakpoint display */}
        <style>{`
          @media (min-width: 992px) {
            .desktop-nav { display: block !important; }
            .desktop-cta { display: flex !important; }
            .mobile-hamburger { display: none !important; }
          }
          @media (max-width: 640px) {
            .top-banner-right { display: none !important; }
          }
        `}</style>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'flex-end'
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
              gap: '1.5rem',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(15,90,49,0.1)', pb: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <img src="/sai-satvik-logo.png" alt="Sai Satvik" style={{ height: '40px' }} />
                <span className="marathi-heading" style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>साई सात्विक</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-granite)' }}>
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-primary-dark)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      textDecoration: 'none',
                      backgroundColor: 'rgba(15,90,49,0.04)'
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Action Buttons in Drawer */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenOrderModal(); }}
                className="btn btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={20} />
                <span>WhatsApp वर ऑर्डर करा</span>
              </button>

              <a 
                href={`tel:${BUSINESS_INFO.primaryPhone}`} 
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Phone size={20} />
                <span>फोन वर संपर्क करा</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
