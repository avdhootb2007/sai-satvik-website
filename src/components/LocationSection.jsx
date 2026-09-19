import React from 'react';
import { MapPin, Clock, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function LocationSection() {
  const { language, t } = useLanguage();
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sai Satvik Dairy Products Takali Niphad Nashik")}`;

  return (
    <section id="location" className="section-padding" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <MapPin size={16} />
            <span>{t('location')}</span>
          </span>
          <h2 className="section-title">
            {language === 'mr' ? 'दुकान व पत्ता (Store Address)' : 'Store Location & Address'}
          </h2>
          <p className="section-desc">
            {language === 'mr' 
              ? 'आमच्या दुकानाला भेट द्या किंवा नकाशानुसार लोकेशन निवडून थेट या.' 
              : 'Visit our store directly or navigate via Google Maps.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2.5rem',
          alignItems: 'stretch'
        }}>
          
          {/* Left Column: Address Details */}
          <div style={{ gridColumn: 'span 12' }} className="location-info-col">
            <div className="card-base" style={{
              padding: '2.25rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-white)',
              borderLeft: '5px solid var(--color-primary)'
            }}>
              
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  backgroundColor: 'var(--color-primary-soft)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <MapPin size={16} />
                  <span>{language === 'mr' ? 'मुख्य दुकान / स्टोअर' : 'Main Dairy Store'}</span>
                </div>

                <h3 className="marathi-heading" style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--color-primary-dark)',
                  marginBottom: '1.25rem'
                }}>
                  {language === 'mr' ? BUSINESS_INFO.marathiName : BUSINESS_INFO.name}
                </h3>

                <div style={{
                  fontSize: '1.08rem',
                  color: 'var(--color-granite-dark)',
                  lineHeight: 1.8,
                  marginBottom: '1.75rem',
                  padding: '1.25rem',
                  backgroundColor: 'var(--color-cold-air)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(15, 90, 49, 0.1)'
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{BUSINESS_INFO.address.line1}</div>
                  <div>{BUSINESS_INFO.address.line2}</div>
                  <div>{BUSINESS_INFO.address.line3}</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', marginTop: '0.3rem' }}>
                    {BUSINESS_INFO.address.line4}
                  </div>
                </div>

                {/* Store Timing */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  marginBottom: '1.5rem',
                  padding: '0.85rem 1.1rem',
                  backgroundColor: 'var(--color-gold-light)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  <Clock size={22} style={{ color: 'var(--color-gold-dark)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {language === 'mr' ? 'दुकानाची वेळ' : 'Store Hours'}
                    </div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-granite-dark)' }}>
                      {BUSINESS_INFO.timing}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem' }}>
                <a 
                  href={mapsSearchUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '0.95rem' }}
                >
                  <Navigation size={18} />
                  <span>{language === 'mr' ? 'नकाशावर दिशा पहा' : 'Get Directions'}</span>
                </a>
                <a 
                  href={`tel:${BUSINESS_INFO.primaryPhone}`} 
                  className="btn btn-secondary"
                  style={{ flex: 1, fontSize: '0.95rem' }}
                >
                  <Phone size={18} />
                  <span>{language === 'mr' ? 'कॉल करा' : 'Call Store'}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Google Maps iFrame */}
          <div style={{ gridColumn: 'span 12' }} className="location-map-col">
            <div className="card-base" style={{
              height: '100%',
              minHeight: '400px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <iframe 
                title="Sai Satvik Dairy Products Location Takali Niphad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14986.321!2d74.10!3d20.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdde0f000000001%3A0x0!2sTakali%2C%20Niphad%2C%20Nashik!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .location-info-col { grid-column: span 5 !important; }
          .location-map-col { grid-column: span 7 !important; }
        }
      `}</style>
    </section>
  );
}
