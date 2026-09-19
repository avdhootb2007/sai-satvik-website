import React from 'react';
import { ShieldCheck, Sun, Sparkles, HeartHandshake, Truck, Award } from 'lucide-react';

export default function WhyUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: '१००% शुद्ध व भेसळमुक्त',
      desc: 'आमचे दूध व सर्व उत्पादने कोणत्याही प्रकारच्या रासायनिक भेसळीशिवाय पूर्णपणे शुद्ध व सात्विक असतात.'
    },
    {
      icon: Sun,
      title: 'दररोज ताजे संकलन',
      desc: 'दररोज सकाळी आणि संध्याकाळी थेट निफाड परिसरातील शेतकऱ्यांकडून ताजे दूध संकलित केले जाते.'
    },
    {
      icon: Sparkles,
      title: 'अस्सल पारंपारिक चव',
      desc: 'शुद्ध खवा, साजूक तूप आणि पारंपारिक पाककृतींचा वापर करून बनवलेली महाराष्ट्रीयन स्वादिष्ट मिठाई.'
    },
    {
      icon: HeartHandshake,
      title: 'उत्तम स्वच्छता व दर्जा',
      desc: 'प्रक्रियेच्या प्रत्येक टप्प्यावर कडक स्वच्छता मानके पाळली जातात, ज्यामुळे तुम्हाला मिळते सर्वोत्तम दर्जा.'
    },
    {
      icon: Truck,
      title: 'स्थानिक होम डिलिव्हरी',
      desc: 'टाकळी, साई नगर आणि निफाड परिसरात जलद व वेळेवर होम डिलिव्हरी उपलब्ध.'
    },
    {
      icon: Award,
      title: 'समारंभासाठी बल्क ऑर्डर',
      desc: 'लग्नकार्य, पूजा व सणासुदीच्या कार्यक्रमांसाठी स्पेशल मिठाई व डेअरी प्रॉडक्ट्सची घाऊक ऑर्डर स्वीकारली जाते.'
    }
  ];

  return (
    <section id="why-us" className="section-padding" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <Award size={16} />
            <span>आमची खास वैशिष्ट्ये (Why Choose Us)</span>
          </span>
          <h2 className="section-title">साई सात्विकच का निवडावे?</h2>
          <p className="section-desc">
            तुमच्या आणि तुमच्या कुटुंबाच्या आरोग्यासाठी आम्ही घेऊन आलो आहोत १००% शुद्ध, ताजी आणि सात्विक उत्पादने.
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
                className="card-base"
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
