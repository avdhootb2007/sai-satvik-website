import React from 'react';
import { Milk, Container, GlassWater, Box, Flame, UtensilsCrossed, Sparkles, Gift } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategorySection({ activeCategory, onSelectCategory }) {
  // Map icons
  const iconMap = {
    milk: Milk,
    curd: Container,
    buttermilk: GlassWater,
    paneer: Box,
    ghee: Flame,
    shrikhand: UtensilsCrossed,
    dairy: Sparkles,
    sweets: Gift
  };

  // Category cards data (filtering out 'all')
  const categoryCards = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section id="categories" className="section-padding" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <Sparkles size={16} />
            <span>उत्पादन श्रेणी (Categories)</span>
          </span>
          <h2 className="section-title">आमची खास सात्विक श्रेणी</h2>
          <p className="section-desc">
            ताज्या दुधापासून बनवलेली १००% शुद्ध डेअरी उत्पादने व तोंडाला पाणी आणणारी पारंपारिक मिठाई.
          </p>
        </div>

        {/* Categories 8 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          {categoryCards.map((cat) => {
            const IconComponent = iconMap[cat.id] || Sparkles;
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="card-base"
                style={{
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--color-primary-soft)' : 'var(--color-white)',
                  borderColor: isSelected ? 'var(--color-primary)' : 'rgba(15, 90, 49, 0.08)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}
              >
                {/* Category Icon */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-cold-air)',
                  color: isSelected ? 'var(--color-white)' : 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-smooth)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.04)'
                }}>
                  <IconComponent size={28} />
                </div>

                {/* Marathi Title */}
                <h3 className="marathi-heading" style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-granite-dark)'
                }}>
                  {cat.name}
                </h3>

                {/* English Subtitle */}
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-granite)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {cat.english}
                </span>

                {/* Explore Badge */}
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginTop: '0.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}>
                  पहा &rarr;
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
