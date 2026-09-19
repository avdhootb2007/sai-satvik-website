import React from 'react';
import { MessageCircle, ShoppingBag, PhoneCall, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onOpenOrderModal }) {
  const { language, t } = useLanguage();

  return (
    <section 
      id="hero" 
      style={{
        position: 'relative',
        padding: '3.5rem 0 5rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-cold-air) 100%)'
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          
          {/* Left Text Column */}
          <div style={{ gridColumn: 'span 12' }} className="hero-text-col">
            
            {/* Top Purity Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.25rem',
              backgroundColor: 'var(--color-primary-soft)',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(15, 90, 49, 0.2)',
              fontSize: '0.92rem',
              fontWeight: 700,
              marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
              <span>{t('bannerText')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="marathi-heading" style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              color: 'var(--color-primary-dark)',
              lineHeight: 1.18,
              marginBottom: '1rem',
              fontWeight: 800
            }}>
              {language === 'mr' ? 'शुद्ध सात्विक' : 'Pure Satvik'} <br />
              <span style={{
                color: 'var(--color-primary)',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #1D8A4B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {language === 'mr' ? 'डेअरी उत्पादने' : 'Dairy Products'}
              </span>
            </h1>

            {/* Business Description */}
            <p className="marathi-body" style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
              color: 'var(--color-granite-dark)',
              fontWeight: 600,
              lineHeight: 1.5,
              marginBottom: '1.75rem',
              maxWidth: '580px'
            }}>
              "{BUSINESS_INFO.tagline}"
            </p>

            <p style={{
              fontSize: '1rem',
              color: 'var(--color-granite)',
              marginBottom: '2rem',
              lineHeight: 1.6,
              maxWidth: '560px'
            }}>
              {language === 'mr'
                ? 'मु.पो. टाकळी, ता. निफाड मधील विश्वासार्ह नाव. दररोज सकाळी आणि संध्याकाळी थेट शेतातील ताजे गाई-म्हशीचे दूध, शुद्ध साजूक तूप, घट्ट दही, मऊ पनीर, श्रीखंड आणि सणासुदीसाठी खास मिठाई.'
                : 'Trusted name in Takali, Niphad, Nashik. Fresh farm-sourced Cow & Buffalo Milk, Pure Desi Ghee, Thick Curd, Soft Paneer, Shrikhand & Traditional Sweets delivered daily.'}
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2.5rem'
            }}>
              <a 
                href="#products" 
                className="btn btn-primary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
              >
                <ShoppingBag size={20} />
                <span>{language === 'mr' ? 'उत्पादने पहा' : 'View Products'}</span>
              </a>

              <button 
                onClick={() => onOpenOrderModal()}
                className="btn btn-whatsapp"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
              >
                <MessageCircle size={20} />
                <span>{t('orderWhatsApp')}</span>
              </button>

              <a 
                href="#contact" 
                className="btn btn-secondary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
              >
                <PhoneCall size={20} />
                <span>{language === 'mr' ? 'आमच्याशी संपर्क करा' : 'Contact Us'}</span>
              </a>
            </div>

            {/* Purity Highlights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(15, 90, 49, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                  {language === 'mr' ? '१००% भेसळमुक्त' : '100% Unadulterated'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                  {language === 'mr' ? 'दररोज ताजे संकलन' : 'Fresh Daily Collection'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                  {language === 'mr' ? 'पारंपारिक स्वच्छता' : 'Hygienic Traditional Process'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Column */}
          <div style={{ gridColumn: 'span 12' }} className="hero-img-col">
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid var(--color-white)',
                backgroundColor: 'var(--color-white)'
              }}>
                <img 
                  src="/images/hero-banner.png" 
                  alt="Sai Satvik Fresh Dairy Products"
                  style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.02)' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
