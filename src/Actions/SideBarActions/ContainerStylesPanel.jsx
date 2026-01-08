import React, { useState, useEffect } from 'react';

const ContainerStylesPanel = ({ appSettings, onSettingsChange }) => {
  const [colors, setColors] = useState({
    primaryBackground: appSettings.primaryBackground || '#101010',
    secondaryBackground: appSettings.secondaryBackground || '#1d1d1d',
    textColor: appSettings.textColor || '#ffffff',
    accentColor: appSettings.accentColor || '#646cff',
    borderColor: appSettings.borderColor || '#333333',
    cardBackground: appSettings.cardBackground || '#101010ff',
    canvasBackground: appSettings.canvasBackground || '#232323',
  });

  const colorOptions = [
    { key: 'primaryBackground', label: 'Primary Background', description: 'Main background color' },
    { key: 'secondaryBackground', label: 'Secondary Background', description: 'Panel backgrounds' },
    { key: 'textColor', label: 'Text Color', description: 'Default text color' },
    { key: 'accentColor', label: 'Accent Color', description: 'Buttons and highlights' },
    { key: 'borderColor', label: 'Border Color', description: 'Borders and dividers' },
    { key: 'cardBackground', label: 'Card Background', description: 'Card default color' },
    { key: 'canvasBackground', label: 'Canvas Background', description: 'Canvas color' },
  ];

  const handleColorChange = (key, value) => {
    const updatedColors = { ...colors, [key]: value };
    setColors(updatedColors);
    
    // Apply changes immediately
    applyColorChanges(updatedColors);
    
    // Update parent state
    onSettingsChange({ ...appSettings, ...updatedColors });
  };

  const applyColorChanges = (colorObj) => {
    // Update CSS custom properties
    document.documentElement.style.setProperty('--bg-color', colorObj.primaryBackground);
    document.documentElement.style.setProperty('--text-color', colorObj.textColor);
    document.documentElement.style.setProperty('--accent-color', colorObj.accentColor);
    document.documentElement.style.setProperty('--border-color', colorObj.borderColor);
    
    // Update body styles
    document.body.style.backgroundColor = colorObj.primaryBackground;
    document.body.style.color = colorObj.textColor;

    // Update specific elements
    const style = document.createElement('style');
    style.id = 'dynamic-colors';
    
    // Remove previous dynamic style if it exists
    const existing = document.getElementById('dynamic-colors');
    if (existing) existing.remove();

    style.textContent = `
      :root {
        --bg-color: ${colorObj.primaryBackground};
        --text-color: ${colorObj.textColor};
        --accent-color: ${colorObj.accentColor};
        --border-color: ${colorObj.borderColor};
      }

      .PropertiesPannel {
        background-color: ${colorObj.secondaryBackground} !important;
        color: ${colorObj.textColor} !important;
        border: 1px solid ${colorObj.borderColor} !important;
      }

      .sidebar {
        background-color: ${colorObj.secondaryBackground} !important;
      }

      .Floatingbaricons {
        background-color: ${colorObj.primaryBackground} !important;
        color: ${colorObj.textColor} !important;
        border: 1px solid ${colorObj.borderColor} !important;
      }

      button {
        background-color: ${colorObj.secondaryBackground} !important;
        color: ${colorObj.textColor} !important;
        border: 1px solid ${colorObj.borderColor} !important;
      }

      button:hover {
        border-color: ${colorObj.accentColor} !important;
      }

      input, textarea {
        background-color: ${colorObj.primaryBackground} !important;
        color: ${colorObj.textColor} !important;
        border: 1px solid ${colorObj.borderColor} !important;
      }

      input::placeholder, textarea::placeholder {
        color: ${colorObj.textColor}80 !important;
      }

      .sidePanel {
        background-color: ${colorObj.secondaryBackground} !important;
        border: 1px solid ${colorObj.borderColor} !important;
      }

      .effect-button {
        background-color: ${colorObj.secondaryBackground} !important;
        color: ${colorObj.textColor} !important;
        border: 1px solid ${colorObj.borderColor} !important;
      }

      .effect-button:hover {
        background-color: ${colorObj.accentColor}20 !important;
        border-color: ${colorObj.accentColor} !important;
      }

      .effect-button.selected {
        background-color: ${colorObj.accentColor} !important;
        color: white !important;
        border-color: ${colorObj.accentColor} !important;
      }

      .card-wrapper {
        background-color: ${colorObj.cardBackground} !important;
      }

      h3, h2, h1 {
        color: ${colorObj.textColor} !important;
      }

      .headerDiv {
        background-color: ${colorObj.primaryBackground} !important;
        border: 1px solid ${colorObj.borderColor} !important;
      }
    `;

    document.head.appendChild(style);
  };

  const resetToDefaults = () => {
    const defaults = {
      primaryBackground: '#101010',
      secondaryBackground: '#1d1d1d',
      textColor: '#ffffff',
      accentColor: '#646cff',
      borderColor: '#333333',
      cardBackground: '#101010ff',
      canvasBackground: '#232323',
    };
    setColors(defaults);
    applyColorChanges(defaults);
    onSettingsChange({ ...appSettings, ...defaults });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        gap: '12px',
        overflow: 'auto',
        padding: '12px',
      }}
      className="effect-section-scroll"
    >
      <h3
        style={{
          margin: 0,
          color: '#fff',
          fontSize: '14px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '8px',
        }}
      >
        Website Colors
      </h3>

      {/* Color Options */}
      {colorOptions.map((option) => (
        <div
          key={option.key}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '10px',
            background: '#0f0f0f',
            borderRadius: '8px',
            border: '1px solid #222',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {option.label}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#999',
                  marginTop: '2px',
                }}
              >
                {option.description}
              </div>
            </div>
            <input
              type="color"
              value={colors[option.key]}
              onChange={(e) => handleColorChange(option.key, e.target.value)}
              style={{
                width: '50px',
                height: '40px',
                border: `2px solid ${colors[option.key]}`,
                borderRadius: '6px',
                cursor: 'pointer',
                padding: '2px',
              }}
              title={`Change ${option.label}`}
            />
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#666',
              fontFamily: 'monospace',
              backgroundColor: '#1a1a1a',
              padding: '4px 6px',
              borderRadius: '4px',
              wordBreak: 'break-all',
            }}
          >
            {colors[option.key]}
          </div>
        </div>
      ))}

      {/* Reset Button */}
      <button
        onClick={resetToDefaults}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '8px',
          background: '#646cff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#7c8dff';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#646cff';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Reset to Defaults
      </button>
    </div>
  );
};

export { ContainerStylesPanel };
