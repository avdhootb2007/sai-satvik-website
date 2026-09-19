import React, { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle, Clock, MapPin } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS } from '../data/products';

export default function ContactSection() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].name);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    const textMessage = `नमस्कार साई सात्विक डेअरी!\n\nमी वेबसाईटवरून चौकशी करत आहे:\n- नाव: ${customerName || 'ग्राहक'}\n- संपर्क: ${customerPhone || 'नमुद केला नाही'}\n- उत्पादन: ${selectedProduct}\n- टीप/संदेश: ${notes || 'कृपया मला माहिती द्या.'}\n\nधन्यवाद!`;
    
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
            <span>संपर्क साधा (Get In Touch)</span>
          </span>
          <h2 className="section-title">आमच्याशी थेट बोला किंवा चौकशी करा</h2>
          <p className="section-desc">
            कोणत्याही प्रॉडक्टबद्दल माहिती घेण्यासाठी किंवा बल्क ऑर्डरसाठी आम्हाला कॉल किंवा WhatsApp करा.
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
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-granite)', fontWeight: 600 }}>प्राथमिक संपर्क नंबर</div>
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
                  <span>डायरेक्ट कॉल करा</span>
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
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-granite)', fontWeight: 600 }}>द्वितीयक संपर्क नंबर</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                      9881010750
                    </div>
                  </div>
                </div>

                <a 
                  href="tel:9881010750"
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.92rem' }}
                >
                  <Phone size={16} />
                  <span>कॉल करा</span>
                </a>
              </div>

              {/* WhatsApp Fast Connect Box */}
              <div className="card-base" style={{
                padding: '1.75rem',
                backgroundColor: '#128C7E',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <MessageCircle size={28} />
                  <h3 className="marathi-heading" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                    WhatsApp वर त्वरित चॅट करा
                  </h3>
                </div>
                <p style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  तुम्हाला हव्या असलेल्या कोणत्याही प्रॉडक्टची नाव व प्रमाण सांगा आणि ५ मिनिटांत रिप्लाय मिळवा.
                </p>
                <a 
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent("नमस्कार साई सात्विक डेअरी! मला प्रॉडक्ट बद्दल माहिती हवी आहे.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center', backgroundColor: '#FFFFFF', color: '#128C7E', fontWeight: 800 }}
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp चॅट सुरू करा</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Instant WhatsApp Quick Form */}
          <div style={{ gridColumn: 'span 12' }} className="contact-form-col">
            <div className="card-base" style={{
              padding: '2.25rem',
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-md)'
            }}>
              
              <h3 className="marathi-heading" style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--color-primary-dark)',
                marginBottom: '0.5rem'
              }}>
                ऑनलाइन मागणी व चौकशी फॉर्म
              </h3>
              
              <p style={{ fontSize: '0.95rem', color: 'var(--color-granite)', marginBottom: '1.5rem' }}>
                खालील माहिती भरा आणि थेट WhatsApp वर संदेश पाठवा.
              </p>

              <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                
                {/* Customer Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.4rem' }}>
                    तुमचे नाव (Your Name)
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="उदा. राहुल निफाडे"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.95rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(15, 90, 49, 0.2)',
                      backgroundColor: 'var(--color-cream)',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.4rem' }}>
                    मोबाईल नंबर (Phone Number)
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="उदा. 98220XXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.95rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(15, 90, 49, 0.2)',
                      backgroundColor: 'var(--color-cream)',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Product Select */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.4rem' }}>
                    उत्पादन निवडा (Select Product)
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.95rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(15, 90, 49, 0.2)',
                      backgroundColor: 'var(--color-cream)',
                      outline: 'none'
                    }}
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.englishName})
                      </option>
                    ))}
                    <option value="समारंभ/लग्न बल्क ऑर्डर">समारंभ/लग्न बल्क ऑर्डर (Bulk Order)</option>
                    <option value="इतर चौकशी">इतर चौकशी (Other Inquiry)</option>
                  </select>
                </div>

                {/* Message / Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-granite-dark)', marginBottom: '0.4rem' }}>
                    प्रमाण / संदेश (Message & Quantity)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="उदा. ५ लिटर दूध व १ किलो पेढा उद्या सकाळी पाहिजे..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.95rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(15, 90, 49, 0.2)',
                      backgroundColor: 'var(--color-cream)',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <Send size={18} />
                  <span>WhatsApp वर संदेश पाठवा</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-cards-col { grid-column: span 5 !important; }
          .contact-form-col { grid-column: span 7 !important; }
        }
      `}</style>
    </section>
  );
}
