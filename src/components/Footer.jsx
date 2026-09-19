import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, CATEGORIES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onSelectCategory }) {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--color-primary-dark)',
      color: '#EBF5EE',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      borderTop: '4px solid var(--color-gold)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Column 1: Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img 
                src="/sai-satvik-logo.png" 
                alt="Sai Satvik Dairy Products Logo" 
                style={{ height: '56px', width: 'auto', background: '#FFFFFF', padding: '2px', borderRadius: '50%' }}
              />
              <div>
                <h3 className="marathi-heading" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15 }}>
                  {language === 'mr' ? 'साई सात्विक' : 'Sai Satvik'}
                </h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.5px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                  Dairy Products
                </span>
              </div>
            </div>

            <p className="marathi-body" style={{ fontSize: '1.05rem', color: '#D2E3D8', fontWeight: 600, lineHeight: 1.5 }}>
              "{BUSINESS_INFO.heading}"
            </p>

            <p style={{ fontSize: '0.9rem', color: '#B3CFC0', lineHeight: 1.6 }}>
              {BUSINESS_INFO.tagline} {language === 'mr' ? '१००% शुद्ध, ताजे व सात्विक. निफाड, नाशिक मधील विश्वसनीय नाव.' : '100% Pure, Fresh & Wholesome. Trusted Dairy in Niphad, Nashik.'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <a 
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
              >
                <Phone size={18} />
              </a>
              <a 
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="marathi-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
              {language === 'mr' ? 'महत्त्वाच्या लिंक्स (Quick Links)' : 'Quick Links'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#hero" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>{t('home')}</a></li>
              <li><a href="#categories" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>{t('categories')}</a></li>
              <li><a href="#products" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>{t('products')}</a></li>
              <li><a href="#why-us" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>{t('whyUs')}</a></li>
              <li><a href="#about" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>{t('about')}</a></li>
              <li><a href="#location" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>{t('location')}</a></li>
              <li><a href="#contact" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>{t('contact')}</a></li>
            </ul>
          </div>

          {/* Column 3: Categories List */}
          <div>
            <h4 className="marathi-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
              {t('categories')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <a 
                    href="#products" 
                    onClick={() => onSelectCategory(cat.id)}
                    style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    {language === 'mr' ? cat.name : cat.english}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Timing */}
          <div>
            <h4 className="marathi-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
              {t('contact')}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: '#D2E3D8' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>{BUSINESS_INFO.address.line1}, {BUSINESS_INFO.address.line2}, {BUSINESS_INFO.address.line3}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span>{BUSINESS_INFO.primaryPhone} / {BUSINESS_INFO.phones[1]}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <span>{BUSINESS_INFO.timing}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.88rem',
          color: '#B3CFC0'
        }}>
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--color-gold)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            <span>Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
