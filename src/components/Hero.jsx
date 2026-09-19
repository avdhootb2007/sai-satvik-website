import React from 'react';
import { MessageCircle, ShoppingBag, PhoneCall, CheckCircle2, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export default function Hero({ onOpenOrderModal }) {
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
      {/* Decorative Traditional Background Circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15, 90, 49, 0.06) 0%, rgba(212, 175, 55, 0.03) 70%, transparent 100%)',
        pointerEvents: 'none'
      }} />

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
              <span>१००% शुद्ध सात्विक ताजे दूध व पारंपारिक मिठाई</span>
            </div>

            {/* Main Marathi Heading */}
            <h1 className="marathi-heading" style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              color: 'var(--color-primary-dark)',
              lineHeight: 1.18,
              marginBottom: '1rem',
              fontWeight: 800
            }}>
              शुद्ध सात्विक <br />
              <span style={{
                color: 'var(--color-primary)',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #1D8A4B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                डेअरी उत्पादने
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
              मु.पो. टाकळी, ता. निफाड मधील विश्वासार्ह नाव. दररोज सकाळी आणि संध्याकाळी थेट शेतातील ताजे गाई-म्हशीचे दूध, शुद्ध साजूक तूप, घट्ट दही, मऊ पनीर, श्रीखंड आणि सणासुदीसाठी खास मिठाई.
            </p>

            {/* Three Prominent CTAs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2.5rem'
            }}>
              {/* CTA 1: उत्पादने पहा */}
              <a 
                href="#products" 
                className="btn btn-primary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
              >
                <ShoppingBag size={20} />
                <span>उत्पादने पहा</span>
              </a>

              {/* CTA 2: WhatsApp वर ऑर्डर करा */}
              <button 
                onClick={() => onOpenOrderModal()}
                className="btn btn-whatsapp"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
              >
                <MessageCircle size={20} />
                <span>WhatsApp वर ऑर्डर करा</span>
              </button>

              {/* CTA 3: आमच्याशी संपर्क करा */}
              <a 
                href="#contact" 
                className="btn btn-secondary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
              >
                <PhoneCall size={20} />
                <span>आमच्याशी संपर्क करा</span>
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
                  १००% भेसळमुक्त
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                  दररोज ताजे संकलन
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                  पारंपारिक स्वच्छता
                </span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Column */}
          <div style={{ gridColumn: 'span 12' }} className="hero-img-col">
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto' }}>
              
              {/* Main Banner Visual */}
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
                  alt="Sai Satvik Dairy Products Fresh Milk & Sweets Showcase" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '440px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Overlaid Tag */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(15, 90, 49, 0.92)',
                  backdropFilter: 'blur(6px)',
                  color: 'var(--color-white)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <Sparkles size={16} style={{ color: 'var(--color-gold)' }} />
                  <span>PURE FOR SURE</span>
                </div>
              </div>

              {/* Floating Badge Card 1 - Daily Pure Liters */}
              <div className="animate-float" style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '-1.5rem',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(15,90,49,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                zIndex: 2
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}>
                  🥛
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>५००+ लिटर</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-granite)', fontWeight: 600 }}>दररोज ताजे दूध वितरण</div>
                </div>
              </div>

              {/* Floating Badge Card 2 - Customer Rating */}
              <div style={{
                position: 'absolute',
                top: '-1rem',
                right: '-1rem',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.1rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                zIndex: 2
              }}>
                <div style={{ color: 'var(--color-gold-dark)', fontWeight: 800, fontSize: '1.1rem' }}>★ 4.9</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-granite-dark)' }}>
                  ग्राहकांचा विश्वास
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-text-col { grid-column: span 7 !important; }
          .hero-img-col { grid-column: span 5 !important; }
        }
      `}</style>
    </section>
  );
}
