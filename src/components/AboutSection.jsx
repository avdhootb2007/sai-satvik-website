import React from 'react';
import { Heart, CheckCircle2, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--color-cold-air)' }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '3rem',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Image & Badge Collage */}
          <div style={{ gridColumn: 'span 12' }} className="about-img-col">
            <div style={{ position: 'relative', maxWidth: '520px', margin: '0 auto' }}>
              
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid var(--color-white)',
                backgroundColor: 'var(--color-white)'
              }}>
                <img 
                  src="/images/sweets.png" 
                  alt="Sai Satvik Traditional Sweets & Dairy Products" 
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '420px', objectFit: 'cover' }}
                />
              </div>

              {/* Overlaid Card */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1rem',
                backgroundColor: 'var(--color-primary-dark)',
                color: 'var(--color-white)',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                maxWidth: '260px'
              }}>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  {language === 'mr' ? 'अखंड विश्वास' : 'Complete Trust'}
                </div>
                <div className="marathi-heading" style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>
                  {language === 'mr' ? 'शुद्धतेची १००% गॅरंटी' : '100% Purity Guarantee'}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content */}
          <div style={{ gridColumn: 'span 12' }} className="about-text-col">
            
            <span className="section-subtitle glass-badge">
              <Heart size={16} />
              <span>{t('about')}</span>
            </span>

            <h2 className="section-title animate-text-shimmer" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              {language === 'mr' 
                ? 'साई सात्विक डेअरी उत्पादने - शुद्धतेचा ध्यास, विश्वासाचे नाते!' 
                : 'Sai Satvik Dairy Products - Committed to Purity & Trust!'}
            </h2>

            <p className="marathi-body" style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: '1rem',
              lineHeight: 1.5
            }}>
              "{BUSINESS_INFO.tagline}"
            </p>

            <p style={{
              fontSize: '1rem',
              color: 'var(--color-granite)',
              lineHeight: 1.7,
              marginBottom: '1.25rem'
            }}>
              {language === 'mr'
                ? 'मु.पो. टाकळी, ता. निफाड (जि. नाशिक) मधील साई सात्विक डेअरी उत्पादने हे ताज्या दूध आणि पारंपारिक मिठाईसाठी नावाजलेले ठिकाण आहे. ग्रामीण भागातील ताज्या दुधाचे शुद्ध संकलन करून ते कोणत्याही रासायनिक भेसळीशिवाय थेट ग्राहकांपर्यंत पोहोचवणे हे आमचे मुख्य उद्दिष्ट आहे.'
                : 'Located in Takali, Niphad, Nashik, Sai Satvik Dairy Products is renowned for fresh farm milk and traditional sweets. Our mission is to collect pure farm milk daily and deliver it directly to consumers without any adulteration.'}
            </p>

            <p style={{
              fontSize: '1rem',
              color: 'var(--color-granite)',
              lineHeight: 1.7,
              marginBottom: '1.75rem'
            }}>
              {language === 'mr'
                ? 'आमच्याकडे गाई व म्हशीचे ताजे दूध, रवादार साजूक तूप, मऊ पनीर, घट्ट दही, ताक, केसर श्रीखंड आणि विविध प्रकारच्या स्वादिष्ट सणासुदीच्या मिठाई मिळतात.'
                : 'We offer fresh Cow and Buffalo milk, Desi Ghee, soft Paneer, thick Curd, Masala Taak, Kesar Shrikhand, and traditional festival sweets.'}
            </p>

            {/* Checklist */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.85rem',
              marginBottom: '2rem'
            }}>
              {[
                language === 'mr' ? 'थेट शेतातून दररोज संकलन' : 'Fresh Farm Collection Daily',
                language === 'mr' ? 'केमिकलमुक्त शुद्ध प्रक्रिया' : 'Chemical-Free Processing',
                language === 'mr' ? 'हॉटेल व रिसॉर्ट्ससाठी B2B पुरवठा' : 'B2B Hotel & Resort Supply',
                language === 'mr' ? 'स्थानिक जलद होम डिलिव्हरी' : 'Local Fast Home Delivery'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-granite-dark)' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="btn btn-primary" style={{ fontSize: '0.98rem' }}>
                <Phone size={18} />
                <span>{BUSINESS_INFO.primaryPhone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-img-col { grid-column: span 5 !important; }
          .about-text-col { grid-column: span 7 !important; }
        }
      `}</style>
    </section>
  );
}
