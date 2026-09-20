import React from 'react';
import { ShieldCheck, Sun, Sparkles, HeartHandshake, Truck, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyUs() {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: language === 'mr' ? '१००% शुद्ध व भेसळमुक्त' : '100% Pure & Unadulterated',
      desc: language === 'mr' ? 'आमचे दूध व सर्व उत्पादने कोणत्याही प्रकारच्या रासायनिक भेसळीशिवाय पूर्णपणे शुद्ध व सात्विक असतात.' : 'All our milk and dairy products are completely pure, satvik, and chemical-free.'
    },
    {
      icon: Sun,
      title: language === 'mr' ? 'दररोज ताजे संकलन' : 'Fresh Daily Collection',
      desc: language === 'mr' ? 'दररोज सकाळी आणि संध्याकाळी थेट निफाड परिसरातील शेतकऱ्यांकडून ताजे दूध संकलित केले जाते.' : 'Fresh cow and buffalo milk collected daily morning and evening from Niphad farmers.'
    },
    {
      icon: Sparkles,
      title: language === 'mr' ? 'अस्सल पारंपारिक चव' : 'Authentic Traditional Taste',
      desc: language === 'mr' ? 'शुद्ध खवा, साजूक तूप आणि पारंपारिक पाककृतींचा वापर करून बनवलेली महाराष्ट्रीयन स्वादिष्ट मिठाई.' : 'Traditional Maharashtrian sweets crafted with pure khawa, desi ghee, and authentic recipes.'
    },
    {
      icon: HeartHandshake,
      title: language === 'mr' ? 'उत्तम स्वच्छता व दर्जा' : 'Hygienic Standards',
      desc: language === 'mr' ? 'प्रक्रियेच्या प्रत्येक टप्प्यावर कडक स्वच्छता मानके पाळली जातात, ज्यामुळे तुम्हाला मिळते सर्वोत्तम दर्जा.' : 'Strict hygiene standards maintained at every step to deliver uncompromised quality.'
    },
    {
      icon: Truck,
      title: language === 'mr' ? 'स्थानिक होम डिलिव्हरी' : 'Local Home Delivery',
      desc: language === 'mr' ? 'टाकळी, साई नगर आणि निफाड परिसरात जलद व वेळेवर होम डिलिव्हरी उपलब्ध.' : 'Fast and punctual doorstep delivery across Takali, Sai Nagar, and Niphad area.'
    },
    {
      icon: Award,
      title: language === 'mr' ? 'समारंभासाठी बल्क ऑर्डर' : 'Bulk Event Orders',
      desc: language === 'mr' ? 'लग्नकार्य, पूजा व सणासुदीच्या कार्यक्रमांसाठी स्पेशल मिठाई व डेअरी प्रॉडक्ट्सची घाऊक ऑर्डर स्वीकारली जाते.' : 'Wholesale bulk supply available for weddings, festivals, pujas, and corporate events.'
    }
  ];

  return (
    <section id="why-us" className="section-padding" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header animate-text-reveal">
          <span className="section-subtitle glass-badge">
            <Award size={16} />
            <span>{t('whyUs')}</span>
          </span>
          <h2 className="section-title animate-text-shimmer">
            {language === 'mr' ? 'साई सात्विकच का निवडावे?' : 'Why Choose Sai Satvik?'}
          </h2>
          <p className="section-desc">
            {language === 'mr'
              ? 'तुमच्या आणि तुमच्या कुटुंबाच्या आरोग्यासाठी आम्ही घेऊन आलो आहोत १००% शुद्ध, ताजी आणि सात्विक उत्पादने.'
              : 'We bring 100% pure, fresh, and wholesome dairy products for your family\'s health.'}
          </p>
        </div>

        {/* 6 Grid Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem'
        }}>
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={idx} 
                className="glass-card"
                style={{
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComponent size={28} />
                </div>
                <div>
                  <h3 className="marathi-heading" style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--color-primary-dark)',
                    marginBottom: '0.4rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-granite)',
                    lineHeight: 1.6
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
