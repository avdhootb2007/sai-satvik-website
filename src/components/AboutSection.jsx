import React from 'react';
import { Heart, CheckCircle2, ShieldAlert, Award, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export default function AboutSection() {
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
                  अखंड विश्वास
                </div>
                <div className="marathi-heading" style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>
                  शुद्धतेची १००% गॅरंटी
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content */}
          <div style={{ gridColumn: 'span 12' }} className="about-text-col">
            
            <span className="section-subtitle">
              <Heart size={16} />
              <span>आमच्याबद्दल (About Sai Satvik)</span>
            </span>

            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              साई सात्विक डेअरी उत्पादने - शुद्धतेचा ध्यास, विश्वासाचे नाते!
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
              मु.पो. टाकळी, ता. निफाड (जि. नाशिक) मधील **साई सात्विक डेअरी उत्पादने** हे ताज्या दूध आणि पारंपारिक मिठाईसाठी नावाजलेले ठिकाण आहे. ग्रामीण भागातील ताज्या दुधाचे शुद्ध संकलन करून ते कोणत्याही रासायनिक भेसळीशिवाय थेट ग्राहकांपर्यंत पोहोचवणे हे आमचे मुख्य उद्दिष्ट आहे.
            </p>

            <p style={{
              fontSize: '1rem',
              color: 'var(--color-granite)',
              lineHeight: 1.7,
              marginBottom: '1.75rem'
            }}>
              आमच्याकडे गाई व म्हशीचे ताजे दूध, रवादार साजूक तूप, मऊ पनीर, घट्ट दही, ताक, केसर श्रीखंड आणि विविध प्रकारच्या स्वादिष्ट सणासुदीच्या मिठाई मिळतात.
            </p>

            {/* Checklist */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.85rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--color-granite-dark)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                <span>१००% शुद्ध व सात्विक</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--color-granite-dark)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                <span>पारंपारिक स्वच्छता</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--color-granite-dark)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                <span>वाजवी दर (Fair Price)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--color-granite-dark)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                <span>त्वरित होम डिलिव्हरी</span>
              </div>
            </div>

            {/* Contact Highlight Box */}
            <div style={{
              padding: '1.25rem',
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--color-primary)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-granite)', fontWeight: 600 }}>संपर्क व चौकशी करा</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                  {BUSINESS_INFO.primaryPhone} / {BUSINESS_INFO.phones[1]}
                </div>
              </div>

              <a 
                href={`tel:${BUSINESS_INFO.primaryPhone}`} 
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
              >
                <Phone size={16} />
                <span>आत्ताच कॉल करा</span>
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
