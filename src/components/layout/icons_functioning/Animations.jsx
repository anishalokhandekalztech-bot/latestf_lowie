import React, { useState } from 'react';

const Animations = () => {
  const [selectedEffect, setSelectedEffect] = useState(null);

  const categories = {
    animations: [
      'Bounce', 'Fade', 'Slide', 'Rotate', 'Scale', 'Flip', 'Shake', 'Swing'
    ],
    hover: [
      'Glow', 'Lift', 'Pulse', 'Grow', 'Shrink', 'Tilt', 'Float', 'Shadow'
    ],
    transitions: [
      'Smooth', 'Spring', 'Elastic', 'Bounce', 'Ease', 'Linear', 'Delay', 'Custom'
    ]
  };

  const handleEffectClick = (effect) => {
    setSelectedEffect(effect);
    console.log('Selected effect:', effect);
  };

  return (
    <div className="animations-container">
      {Object.keys(categories).map((category) => (
        <div key={category} className="category-section">
          <div className="category-header">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          <div className="effects-grid">
            {categories[category].map((effect) => (
              <button
                key={effect}
                className={`effect-button ${selectedEffect === effect ? 'selected' : ''}`}
                onClick={() => handleEffectClick(effect)}
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 15px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  minWidth: '90px'
                }}
              >
                {effect}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Animations;