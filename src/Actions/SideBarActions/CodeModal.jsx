import React, { useState, useRef } from 'react';
import { generateCardCode, copyToClipboard } from '../../services/codeGenerator';

const CodeModal = ({ isOpen, onClose, selectedCards = [], cards = [], cardStyle = {} }) => {
  const [codeType, setCodeType] = useState('html'); // 'html', 'css', 'full'
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  // Get the selected card
  const selectedCard = selectedCards.length > 0
    ? cards.find(c => c.id === selectedCards[0])
    : null;

  // Generate code for selected card
  const codeData = selectedCard
    ? generateCardCode(selectedCard, cardStyle)
    : { html: '', css: '', fullCode: '' };

  const getDisplayCode = () => {
    switch (codeType) {
      case 'css':
        return codeData.css;
      case 'full':
        return codeData.fullCode;
      default:
        return codeData.html;
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(getDisplayCode());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const code = codeType === 'full' ? codeData.fullCode : getDisplayCode();
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `card-${codeType}.${codeType === 'html' || codeType === 'full' ? 'html' : 'css'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          border: '1px solid #333',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          width: '90%',
          maxWidth: '700px',
          height: '80vh',
          maxHeight: '700px',
          display: 'flex',
          flexDirection: 'column',
          color: '#fff',
          animation: 'slideIn 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #333',
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              📝 Code for Card {selectedCard?.id || ''}
            </h2>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#aaa',
              }}
            >
              HTML, CSS & Animation Code
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: '#fff',
              fontSize: '24px',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#333';
              e.target.style.color = '#646cff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#fff';
            }}
          >
            ✕
          </button>
        </div>

        {/* Type Selector */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            padding: '12px 16px',
            borderBottom: '1px solid #333',
            flexShrink: 0,
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: 'html', label: '📄 HTML' },
            { value: 'css', label: '🎨 CSS' },
            { value: 'full', label: '🌐 Full HTML' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setCodeType(option.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: codeType === option.value ? '2px solid #646cff' : '1px solid #444',
                background: codeType === option.value ? '#2a2a3e' : '#1a1a1a',
                color: codeType === option.value ? '#fff' : '#aaa',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (codeType !== option.value) {
                  e.target.style.borderColor = '#646cff';
                  e.target.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (codeType !== option.value) {
                  e.target.style.borderColor = '#444';
                  e.target.style.color = '#aaa';
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Code Display */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            padding: '12px 16px',
          }}
        >
          <pre
            ref={codeRef}
            style={{
              flex: 1,
              minHeight: 0,
              color: '#00ff88',
              fontSize: '12px',
              fontFamily: "'Courier New', monospace",
              margin: '0',
              padding: '12px',
              overflowY: 'auto',
              lineHeight: '1.5',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              background: '#0f0f0f',
              borderRadius: '6px',
              border: '1px solid #333',
              scrollBehavior: 'smooth',
            }}
            className="code-modal-scroll"
          >
            {getDisplayCode()}
          </pre>
        </div>

        {/* Footer with Actions */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px 20px',
            borderTop: '1px solid #333',
            flexShrink: 0,
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #444',
              background: '#0f0f0f',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#646cff';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#444';
              e.target.style.color = '#aaa';
            }}
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #444',
              background: '#1a1a1a',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#646cff';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#444';
              e.target.style.color = '#aaa';
            }}
          >
            ⬇️ Download
          </button>
          <button
            onClick={handleCopy}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: '#646cff',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.target.style.background = '#7b85ff';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.target.style.background = '#646cff';
              }
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy Code'}
          </button>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideIn {
            from {
              transform: translate(-50%, -48%);
              opacity: 0;
            }
            to {
              transform: translate(-50%, -50%);
              opacity: 1;
            }
          }
          
          .code-modal-scroll::-webkit-scrollbar {
            width: 8px;
          }
          
          .code-modal-scroll::-webkit-scrollbar-track {
            background: #0f0f0f;
            border-radius: 4px;
          }
          
          .code-modal-scroll::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 4px;
          }
          
          .code-modal-scroll::-webkit-scrollbar-thumb:hover {
            background: #666;
          }
        `}</style>
      </div>
    </>
  );
};

export { CodeModal };
