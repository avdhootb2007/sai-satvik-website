import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, CATEGORIES } from '../data/products';

export default function Footer({ onSelectCategory }) {
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
                  साई सात्विक
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
              {BUSINESS_INFO.tagline} १००% शुद्ध, ताजे व सात्विक. निफाड, नाशिक मधील विश्वसनीय नाव.
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
              महत्त्वाच्या लिंक्स (Quick Links)
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#hero" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>मुख्य पृष्ठ (Home)</a></li>
              <li><a href="#categories" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>उत्पादन श्रेणी (Categories)</a></li>
              <li><a href="#products" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>सर्व उत्पादने (Products)</a></li>
              <li><a href="#why-us" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>आमची खास वैशिष्ट्ये (Why Us)</a></li>
              <li><a href="#about" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>आमच्याबद्दल (About)</a></li>
              <li><a href="#location" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>दुकान व पत्ता (Location)</a></li>
              <li><a href="#contact" style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.95rem' }}>संपर्क करा (Contact)</a></li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="marathi-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
              उत्पादने श्रेणी (Categories)
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <a 
                    href="#products" 
                    onClick={() => onSelectCategory(cat.id)}
                    style={{ color: '#D2E3D8', textDecoration: 'none', fontSize: '0.92rem' }}
                  >
                    • {cat.name} ({cat.english})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Address & Contact */}
          <div>
            <h4 className="marathi-heading" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
              संपर्क व पत्ता (Contact & Address)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#D2E3D8' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ lineHeight: 1.6 }}>
                  {BUSINESS_INFO.address.line1}<br />
                  {BUSINESS_INFO.address.line2}<br />
                  {BUSINESS_INFO.address.line3}<br />
                  <strong style={{ color: '#FFFFFF' }}>{BUSINESS_INFO.address.line4}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <div style={{ fontWeight: 700, color: '#FFFFFF' }}>
                  {BUSINESS_INFO.primaryPhone} / {BUSINESS_INFO.phones[1]}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <div>{BUSINESS_INFO.timing}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#B3CFC0'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>Sai Satvik Dairy Products</strong> (साई सात्विक डेअरी उत्पादने). सर्व हक्क सुरक्षित.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>⚡ Vercel Ready</span>
            
            <button 
              onClick={scrollToTop}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'var(--color-gold)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
