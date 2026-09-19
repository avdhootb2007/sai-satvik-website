import React from 'react';
import { MapPin, Clock, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

export default function LocationSection() {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sai Satvik Dairy Products Takali Niphad Nashik")}`;

  return (
    <section id="location" className="section-padding" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <MapPin size={16} />
            <span>आमचा पत्ता व नकाशा (Store Location)</span>
          </span>
          <h2 className="section-title">दुकान व पत्ता (Store Address)</h2>
          <p className="section-desc">
            आमच्या दुकानाला भेट द्या किंवा नकाशानुसार लोकेशन निवडून थेट या.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2.5rem',
          alignItems: 'stretch'
        }}>
          
          {/* Left Column: Formatted Address Details */}
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
                {/* Header Badge */}
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
                  <span>मुख्य दुकान / स्टोअर</span>
                </div>

                <h3 className="marathi-heading" style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: 'var(--color-primary-dark)',
                  marginBottom: '1.25rem'
                }}>
                  {BUSINESS_INFO.marathiName}
                </h3>

                {/* Formatted Full Marathi Address */}
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
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase' }}>
                      वेळ (Store Timings)
                    </div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#2B2B2B' }}>
                      {BUSINESS_INFO.timing}
                    </div>
                  </div>
                </div>

                {/* Phone Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-granite)' }}>कॉल करा / फोन नंबर:</div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a 
                      href={`tel:${BUSINESS_INFO.primaryPhone}`} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        color: 'var(--color-primary-dark)',
                        textDecoration: 'none'
                      }}
                    >
                      <Phone size={18} style={{ color: 'var(--color-primary)' }} />
                      <span>{BUSINESS_INFO.primaryPhone}</span>
                    </a>
                    <span style={{ opacity: 0.4 }}>|</span>
                    <a 
                      href={`tel:${BUSINESS_INFO.phones[1]}`} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        color: 'var(--color-primary-dark)',
                        textDecoration: 'none'
                      }}
                    >
                      <span>{BUSINESS_INFO.phones[1]}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <a 
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Navigation size={18} />
                <span>गूगल मॅपवर दिशा (Directions) पहा</span>
                <ExternalLink size={16} />
              </a>

            </div>
          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div style={{ gridColumn: 'span 12' }} className="location-map-col">
            <div className="card-base" style={{
              height: '100%',
              minHeight: '380px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--color-white)',
              position: 'relative'
            }}>
              <iframe 
                title="Sai Satvik Dairy Products Location Map Takali Niphad Nashik"
                src={BUSINESS_INFO.mapsEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '380px', width: '100%' }} 
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
