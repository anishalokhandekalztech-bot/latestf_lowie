import React, { useState, useRef, useEffect } from 'react';
import { generateCardCode, copyToClipboard } from '../../services/codeGenerator';

const CodeForCanvasPanel = ({ selectedCards = [], cards = [], cardStyle = {} }) => {
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

  if (!selectedCard) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          textAlign: 'center',
          fontSize: '13px',
          gap: '8px',
          padding: '20px',
        }}
      >
        <div style={{ fontSize: '32px' }}>📝</div>
        <div>No card selected</div>
        <div style={{ fontSize: '11px', color: '#555' }}>
          Select a card to view its code
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        gap: '8px',
      }}
    >
      {/* Header */}
      <h3
        style={{
          marginBottom: '4px',
          color: '#fff',
          flexShrink: 0,
          fontSize: '12px',
          margin: '0',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Code for Card {selectedCard.id}
      </h3>

      {/* Type Selector */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          flexShrink: 0,
          borderBottom: '1px solid #333',
          paddingBottom: '6px',
        }}
      >
        {[
          { value: 'html', label: 'HTML' },
          { value: 'css', label: 'CSS' },
          { value: 'full', label: 'Full' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setCodeType(option.value)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: codeType === option.value ? '#646cff' : '#1a1a1a',
              color: codeType === option.value ? '#fff' : '#aaa',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              borderBottom: codeType === option.value ? '2px solid #00f2fe' : 'none',
            }}
            onMouseEnter={(e) => {
              if (codeType !== option.value) {
                e.target.style.background = '#2a2a2a';
              }
            }}
            onMouseLeave={(e) => {
              if (codeType !== option.value) {
                e.target.style.background = '#1a1a1a';
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
          background: '#0f0f0f',
          borderRadius: '6px',
          border: '1px solid #333',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <pre
          ref={codeRef}
          style={{
            flex: 1,
            minHeight: 0,
            color: '#fff',
            fontSize: '11px',
            fontFamily: 'monospace',
            margin: '0',
            padding: '12px',
            overflowY: 'auto',
            lineHeight: '1.5',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
          className="code-display-scroll"
        >
          {getDisplayCode()}
        </pre>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleCopy}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#646cff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#5658e8')}
          onMouseLeave={(e) => (e.target.style.background = '#646cff')}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
        <button
          onClick={handleDownload}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #333',
            background: '#1a1a1a',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#646cff';
            e.target.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = '#333';
            e.target.style.color = '#aaa';
          }}
        >
          ⬇️ Download
        </button>
      </div>

      <style>{`
        .code-display-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .code-display-scroll::-webkit-scrollbar-track {
          background: #0f0f0f;
        }
        .code-display-scroll::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 3px;
        }
        .code-display-scroll::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </div>
  );
};

export { CodeForCanvasPanel };
