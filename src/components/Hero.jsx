import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ShoppingBag, PhoneCall, CheckCircle2, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import AnimatedTypewriter from './AnimatedTypewriter';
import HoverPopWords from './HoverPopWords';

export default function Hero({ onOpenOrderModal }) {
  const { language, t } = useLanguage();
  const heroRef = useRef(null);
  
  // Mouse position state: normalized from -1 to 1
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const marathiWords = [
    '१००% ताजे गाई-म्हशीचे दूध',
    'शुद्ध साजूक तूप',
    'घट्ट मलाईदार दही',
    'मऊ ताजे मलाई पनीर',
    'पारंपारिक श्रीखंड व आम्रखंड',
    'उत्कृष्ट गावरान मिठाई'
  ];

  const englishWords = [
    '100% Farm Fresh Milk',
    'Pure Desi Ghee',
    'Thick Creamy Curd',
    'Soft Fresh Paneer',
    'Kesar & Mango Shrikhand',
    'Traditional Sweets'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rawX = (e.clientX - centerX) / (window.innerWidth / 2);
      const rawY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, rawX));
      const clampedY = Math.max(-1, Math.min(1, rawY));
      
      setMousePos({ x: clampedX, y: clampedY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute 3D transformation values for cow neck/head turning effect
  const headRotateY = mousePos.x * 24; // Left/Right neck turn angle (deg)
  const headRotateX = -mousePos.y * 14; // Up/Down neck tilt angle (deg)
  const headRotateZ = mousePos.x * 6;  // Head roll angle (deg)
  const translateX = mousePos.x * 14;  // Horizontal parallax movement
  const translateY = mousePos.y * 14 + scrollY * 0.05; // Vertical movement + scroll parallax

  // Inverse parallax for floating glass badges
  const badgeTransform1 = `translate3d(${-mousePos.x * 20}px, ${-mousePos.y * 15}px, 30px)`;
  const badgeTransform2 = `translate3d(${mousePos.x * 18}px, ${-mousePos.y * 22}px, 40px)`;

  return (
    <section 
      ref={heroRef}
      id="hero" 
      style={{
        position: 'relative',
        padding: '3.5rem 0 5rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--color-cream) 0%, #EBF4EE 50%, var(--color-cold-air) 100%)'
      }}
    >
      {/* Decorative Glass Glow Circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(255, 255, 255, 0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '0%',
        left: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15, 90, 49, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">
          
          {/* Left Text Column with Glassmorphism backdrop */}
          <div className="hero-text-col">
            
            <div className="glass-panel animate-text-reveal" style={{
              padding: '2.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 20px 40px rgba(15, 90, 49, 0.08)'
            }}>
              
              {/* Top Purity Badge */}
              <div className="glass-badge hover-pop-sentence" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 1.25rem',
                color: 'var(--color-primary-dark)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: '1.25rem'
              }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
                <span>100% Pure Satvik Fresh Milk & Traditional Sweets | Niphad, Nashik</span>
              </div>

              {/* Main Heading with Interactive Mouse Hover Pop Words */}
              <h1 className="marathi-heading" style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                color: 'var(--color-primary-dark)',
                lineHeight: 1.18,
                marginBottom: '1rem',
                fontWeight: 800
              }}>
                <HoverPopWords text={language === 'mr' ? 'शुद्ध सात्विक' : 'Pure Satvik'} /> <br />
                <span className="animate-text-shimmer">
                  <HoverPopWords text={language === 'mr' ? 'डेअरी उत्पादने' : 'Dairy Products'} />
                </span>
              </h1>

              {/* Dynamic Typewriter Tagline */}
              <div className="hover-pop-sentence" style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                color: '#78350F',
                padding: '0.55rem 1.1rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '1.15rem',
                marginBottom: '1.25rem',
                borderLeft: '4px solid var(--color-gold)',
                minHeight: '44px'
              }}>
                <AnimatedTypewriter 
                  words={language === 'mr' ? marathiWords : englishWords} 
                  speed={75}
                  delay={2000}
                />
              </div>

              {/* Description */}
              <p className="hover-pop-sentence" style={{
                fontSize: '1.05rem',
                color: 'var(--color-granite-dark)',
                marginBottom: '2rem',
                lineHeight: 1.6,
                fontWeight: 500
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
                marginBottom: '2rem'
              }}>
                <a 
                  href="#products" 
                  className="btn btn-primary hover-pop-text"
                  style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
                >
                  <ShoppingBag size={20} />
                  <span>{language === 'mr' ? 'उत्पादने पहा' : 'View Products'}</span>
                </a>

                <button 
                  onClick={() => onOpenOrderModal()}
                  className="btn btn-whatsapp hover-pop-text"
                  style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
                >
                  <MessageCircle size={20} />
                  <span>{t('orderWhatsApp')}</span>
                </button>

                <a 
                  href="#contact" 
                  className="btn btn-secondary glass-badge hover-pop-text"
                  style={{ fontSize: '1.05rem', padding: '0.9rem 1.8rem' }}
                >
                  <PhoneCall size={20} />
                  <span>{language === 'mr' ? 'आमच्याशी संपर्क करा' : 'Contact Us'}</span>
                </a>
              </div>

              {/* Purity Highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(15, 90, 49, 0.12)'
              }}>
                <div className="hover-pop-text" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                    {language === 'mr' ? '१००% भेसळमुक्त' : '100% Unadulterated'}
                  </span>
                </div>
                <div className="hover-pop-text" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                    {language === 'mr' ? 'दररोज ताजे संकलन' : 'Fresh Daily Collection'}
                  </span>
                </div>
                <div className="hover-pop-text" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-granite-dark)' }}>
                    {language === 'mr' ? 'पारंपारिक स्वच्छता' : 'Hygienic Traditional Process'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Visual Column: Interactive 3D Cow Mascot with Mouse Neck Tracking */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }} className="hero-img-col">
            
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              perspective: '1200px'
            }}>
              
              {/* Floating Glassmorphism Badge Top Right */}
              <div className="glass-badge animate-float" style={{
                position: 'absolute',
                top: '-15px',
                right: '-10px',
                zIndex: 10,
                padding: '0.75rem 1.25rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                transform: badgeTransform1,
                transition: 'transform 0.15s ease-out'
              }}>
                <Sparkles size={22} color="var(--color-gold)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                    {language === 'mr' ? 'ताजे शेतातील दूध' : '100% Farm Fresh Milk'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-granite)' }}>
                    {language === 'mr' ? 'दररोज सकाळी ५ वाजता' : 'Daily Morning & Evening'}
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphism Badge Bottom Left */}
              <div className="glass-badge" style={{
                position: 'absolute',
                bottom: '15px',
                left: '-15px',
                zIndex: 10,
                padding: '0.75rem 1.25rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                transform: badgeTransform2,
                transition: 'transform 0.15s ease-out'
              }}>
                <Award size={22} color="var(--color-primary)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                    {language === 'mr' ? 'टाकळी, निफाड पसंती' : 'Takali, Niphad Choice'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-granite)' }}>
                    {language === 'mr' ? 'उत्कृष्ट गुणवत्ता व चव' : 'Top Rated Dairy'}
                  </div>
                </div>
              </div>

              {/* Interactive Cow Mascot Card - Turns Neck & Head with Mouse Movement */}
              <div 
                className="glass-card"
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  padding: '8px',
                  boxShadow: `${-mousePos.x * 20}px ${20 - mousePos.y * 10}px 45px rgba(15, 90, 49, 0.18)`,
                  transform: `perspective(1000px) rotateY(${headRotateY}deg) rotateX(${headRotateX}deg) rotateZ(${headRotateZ}deg) translate3d(${translateX}px, ${translateY}px, 0px)`,
                  transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
                  cursor: 'pointer',
                  border: '2px solid rgba(255, 255, 255, 0.9)'
                }}
              >
                <div style={{
                  borderRadius: 'calc(var(--radius-lg) - 4px)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src="/cow_mascot.jpg" 
                    alt="Sai Satvik Friendly Cow Mascot holding Fresh Milk"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                      transform: `scale(1.05) translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`,
                      transition: 'transform 0.12s ease-out'
                    }}
                  />

                  {/* Interactive Glint / Shine overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(${135 + mousePos.x * 45}deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '0.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-primary-dark)',
                opacity: 0.85
              }}>
                ✨ {language === 'mr' ? 'माऊस फिरवा आणि आमच्या सात्विक गाईचे मनमोहक दृश्य पहा!' : 'Move mouse cursor to see our Satvik Cow turn her neck & head!'}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

