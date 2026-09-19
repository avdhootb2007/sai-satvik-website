import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle, Clock } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { language, t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].name);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    const textMessage = language === 'mr'
      ? `नमस्कार साई सात्विक डेअरी!\n\nमी वेबसाईटवरून चौकशी करत आहे:\n- नाव: ${customerName || 'ग्राहक'}\n- संपर्क: ${customerPhone || 'नमुद केला नाही'}\n- उत्पादन: ${selectedProduct}\n- टीप/संदेश: ${notes || 'कृपया मला माहिती द्या.'}\n\nधन्यवाद!`
      : `Hello Sai Satvik Dairy!\n\nInquiry from Website:\n- Name: ${customerName || 'Customer'}\n- Phone: ${customerPhone || 'N/A'}\n- Product: ${selectedProduct}\n- Note: ${notes || 'Please provide information.'}\n\nThank you!`;
    
    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--color-cold-air)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <Phone size={16} />
            <span>{t('contact')}</span>
          </span>
          <h2 className="section-title">
            {language === 'mr' ? 'आमच्याशी थेट बोला किंवा चौकशी करा' : 'Contact Us Directly'}
          </h2>
          <p className="section-desc">
            {language === 'mr' 
              ? 'कोणत्याही प्रॉडक्टबद्दल माहिती घेण्यासाठी किंवा बल्क ऑर्डरसाठी आम्हाला कॉल किंवा WhatsApp करा.' 
              : 'Call or WhatsApp us for product inquiries, home delivery, or bulk event orders.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2.5rem'
        }}>
          
          {/* Left Column: Direct Phone & WhatsApp Cards */}
          <div style={{ gridColumn: 'span 12' }} className="contact-cards-col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Phone Card 1 */}
              <div className="card-base" style={{
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                borderLeft: '4px solid var(--color-primary)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-soft)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-granite)', fontWeight: 600 }}>
                      {language === 'mr' ? 'प्राथमिक संपर्क नंबर' : 'Primary Contact Phone'}
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                      9604988662
                    </div>
                  </div>
                </div>

                <a 
                  href="tel:9604988662"
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
                >
                  <Phone size={16} />
                  <span>{language === 'mr' ? 'डायरेक्ट कॉल करा' : 'Call Directly'}</span>
                </a>
              </div>

              {/* Phone Card 2 */}
              <div className="card-base" style={{
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                borderLeft: '4px solid var(--color-primary)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-soft)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-granite)', fontWeight: 600 }}>
                      {language === 'mr' ? 'पर्यायी संपर्क नंबर' : 'Secondary Contact Phone'}
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                      9423987654
                    </div>
                  </div>
                </div>

                <a 
                  href="tel:9423987654"
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
                >
                  <Phone size={16} />
                  <span>{language === 'mr' ? 'कॉल करा' : 'Call Number'}</span>
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="card-base" style={{
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                backgroundColor: 'rgba(37, 211, 102, 0.08)',
                borderColor: 'rgba(37, 211, 102, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    color: 'var(--color-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MessageCircle size={26} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#1B5E20', fontWeight: 700 }}>
                      {language === 'mr' ? '२४/७ व्हॉट्सॲप सपोर्ट' : '24/7 WhatsApp Support'}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>
                      {BUSINESS_INFO.whatsappNumber}
                    </div>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
                >
                  <MessageCircle size={18} />
                  <span>{language === 'mr' ? 'WhatsApp चॅट सुरू करा' : 'Start WhatsApp Chat'}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div style={{ gridColumn: 'span 12' }} className="contact-form-col">
            <div className="card-base" style={{ padding: '2.25rem' }}>
              <h3 className="marathi-heading" style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                {language === 'mr' ? 'झटपट चौकशी फॉर्म (Quick Inquiry)' : 'Quick Inquiry Form'}
              </h3>

              {submitted ? (
                <div style={{
                  padding: '2rem 1.5rem',
                  backgroundColor: 'var(--color-primary-soft)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  border: '1px solid var(--color-primary)'
                }}>
                  <CheckCircle size={48} style={{ color: 'var(--color-primary)', margin: '0 auto 1rem' }} />
                  <h4 className="marathi-heading" style={{ fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                    {language === 'mr' ? 'धन्यवाद! तुमची चौकशी पाठवली गेली आहे.' : 'Thank you! Your inquiry has been sent.'}
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-granite)' }}>
                    {language === 'mr' ? 'आम्ही लवकरच आपल्याशी संपर्क साधू.' : 'We will respond to your inquiry shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  
                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.35rem', display: 'block' }}>
                      {language === 'mr' ? 'तुमचे नाव (Name) *' : 'Your Name *'}
                    </label>
                    <input 
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. अमित पाटील' : 'e.g. Amit Patil'}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(15, 90, 49, 0.2)',
                        backgroundColor: 'var(--color-cream)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.35rem', display: 'block' }}>
                      {language === 'mr' ? 'मोबाईल नंबर (Phone Number) *' : 'Phone Number *'}
                    </label>
                    <input 
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9876543210"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(15, 90, 49, 0.2)',
                        backgroundColor: 'var(--color-cream)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.35rem', display: 'block' }}>
                      {language === 'mr' ? 'उत्पादन (Select Product)' : 'Select Product'}
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(15, 90, 49, 0.2)',
                        backgroundColor: 'var(--color-cream)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    >
                      {PRODUCTS.map(p => (
                        <option key={p.id} value={p.name}>
                          {language === 'mr' ? p.name : p.englishName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.35rem', display: 'block' }}>
                      {language === 'mr' ? 'संदेश किंवा टीप (Message)' : 'Message / Requirements'}
                    </label>
                    <textarea 
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. दररोज १ लिटर दूध होम डिलिव्हरी हवी आहे.' : 'e.g. Need daily 1 Litre Cow Milk home delivery.'}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(15, 90, 49, 0.2)',
                        backgroundColor: 'var(--color-cream)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ fontSize: '1rem', padding: '0.85rem', width: '100%', justifyContent: 'center' }}
                  >
                    <Send size={18} />
                    <span>{language === 'mr' ? 'WhatsApp द्वारे पाठवा' : 'Send via WhatsApp'}</span>
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-cards-col { grid-column: span 6 !important; }
          .contact-form-col { grid-column: span 6 !important; }
        }
      `}</style>
    </section>
  );
}
