import React, { useState, useRef, useEffect } from 'react';
import '../../index.css';
import { AiAnimationBuilderIcon } from '../../Actions/SideBarActions/AIAnimationBuilder';
import { AnimationsIcon } from '../../Actions/SideBarActions/Animations';
import { CodeForTheCanvasIcon } from '../../Actions/SideBarActions/CodeForTheCanvas';
import { ContainerStyleIcon } from '../../Actions/SideBarActions/ContainerStyle';
import { SettingsIcon } from '../../Actions/SideBarActions/Settings';
import { TemplatesIcon } from '../../Actions/SideBarActions/Templates';
import { CodeModal } from '../../Actions/SideBarActions/CodeModal';
import { ContainerStylesPanel } from '../../Actions/SideBarActions/ContainerStylesPanel';
import Animations from './icons_functioning/Animations';
import Templates from './icons_functioning/templates';
import { animationList } from '../../animations/animationList';
import { hoverEffectsList } from '../../hover_effects/list_hover_effects';
import { transitionsList } from '../../transitions/list_transitions';
import { templatesList } from '../../templates/list_templates';
import { getAIResponse, getAnimationSuggestions } from '../../services/aiService';

// AI Animation Builder Component
const AIAnimationBuilderPanel = () => {
  const [chats, setChats] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSend = async () => {
    if (prompt.trim() && !loading) {
      const userMessage = prompt.trim();
      
      // Add user message to chat
      setChats([...chats, { 
        id: Date.now(), 
        message: userMessage, 
        sender: 'user' 
      }]);
      setPrompt('');
      setLoading(true);

      try {
        console.log("Sending message to AI:", userMessage);
        // Get AI response
        const aiResponse = await getAIResponse(userMessage, 'Flowie - Web Animation Builder');
        console.log("Received AI response:", aiResponse);
        
        // Add AI response to chat
        setChats(prev => [...prev, { 
          id: Date.now() + 1, 
          message: aiResponse, 
          sender: 'ai' 
        }]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        setChats(prev => [...prev, { 
          id: Date.now() + 1, 
          message: 'Sorry, I encountered an error. Please try again. Check browser console (F12) for details.', 
          sender: 'ai' 
        }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to extract code blocks (```...```) and text
  const parseAIResponse = (message) => {
    // Split by code block (```)
    const regex = /```([\s\S]*?)```/g;
    let lastIndex = 0;
    let result = [];
    let match;
    while ((match = regex.exec(message)) !== null) {
      if (match.index > lastIndex) {
        result.push({ type: 'text', content: message.slice(lastIndex, match.index) });
      }
      result.push({ type: 'code', content: match[1].trim() });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < message.length) {
      result.push({ type: 'text', content: message.slice(lastIndex) });
    }
    return result;
  };

  // Handler for applying animation code (to be implemented)
const AIAnimationBuilderPanel = ({ onApplyAnimation }) => {
  // Handler for applying animation code
  const handleApplyAnimation = (code) => {
    if (!onApplyAnimation) return;
    // Try to extract a valid animation key from the code block
    // 1. If code is a single word, use it directly
    // 2. If code contains .anim-<key> or @keyframes <key>, extract <key>
    let key = null;
    const singleWord = code.match(/^([a-zA-Z0-9_-]+)$/);
    if (singleWord) {
      key = singleWord[1];
    } else {
      // Try to extract from .anim-<key>
      const animClass = code.match(/\.anim-([a-zA-Z0-9_-]+)/);
      if (animClass) key = animClass[1];
      // Try to extract from @keyframes <key>
      const keyframes = code.match(/@keyframes\s+([a-zA-Z0-9_-]+)/);
      if (keyframes) key = keyframes[1];
    }
    // Only apply if key is in animationList
    const validKeys = (animationList || []).map(a => a.key);
    if (key && validKeys.includes(key)) {
      onApplyAnimation(key);
    } else {
      alert('Could not detect a valid animation key. Please use a supported animation name.');
    }
  };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 0,
      gap: '12px',
      maxHeight: '480px', // Fixed height for the panel
      height: '480px',
      background: '#181818',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
      border: '1px solid #222',
      overflow: 'hidden',
    }}>
      {/* Heading */}
      <h3 style={{
        marginBottom: '6px',
        color: '#fff',
        flexShrink: 0,
        fontSize: '14px',
        margin: '0 0 6px 0',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        paddingBottom: '8px',
      }}>
        AI Builder
      </h3>

      {/* Chat Display Area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          borderRadius: '8px',
          border: '1px solid #333',
          background: '#0f0f0f',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingRight: '2px',
         // maxHeight: '320px', // Fixed chat area height
        }}
        className="effect-section-scroll"
      >
        {chats.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 500,
              gap: '8px',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: '32px' }}>✨</div>
            <div>No chats yet. Ask me anything!</div>
            <div style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>
              I can help with animations, design, or answer any questions
            </div>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              style={{
                alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: chat.sender === 'user' ? '#646cff' : '#1a1a1a',
                color: '#fff',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '13px',
                lineHeight: '1.5',
                wordWrap: 'break-word',
                boxShadow: chat.sender === 'user'
                  ? '0 2px 8px rgba(100, 108, 255, 0.3)'
                  : '0 2px 8px rgba(255, 255, 255, 0.1)',
                border: chat.sender === 'ai' ? '1px solid #333' : 'none',
                //marginBottom: '4px',
              }}
            >
              {chat.sender === 'ai' ? (
                // Format AI response: separate code and text, add apply button for code
                parseAIResponse(chat.message).map((part, idx) =>
                  part.type === 'code' ? (
                    <div key={idx} style={{ margin: '8px 0', position: 'relative' }}>
                      <pre style={{
                        background: '#23272f',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '12px',
                        overflowX: 'auto',
                        margin: 0,
                        fontFamily: 'monospace',
                        border: '1px solid #333',
                      }}>{part.content}</pre>
                      <button
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          background: '#646cff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          zIndex: 2,
                        }}
                        onClick={() => handleApplyAnimation(part.content)}
                      >Apply Animation</button>
                    </div>
                  ) : (
                    <span key={idx}>{part.content}</span>
                  )
                )
              ) : (
                chat.message
              )}
            </div>
          ))
        )}
        {/* Loading indicator */}
        {loading && (
          <div
            style={{
              alignSelf: 'flex-start',
              maxWidth: '85%',
              background: '#1a1a1a',
              color: '#999',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '13px',
              border: '1px solid #333',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            <span style={{ animation: 'spin 0.6s linear infinite', display: 'inline-block' }}>⟳</span>
            Thinking...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          background: '#0f0f0f',
          borderRadius: '8px',
          border: '1px solid #333',
          padding: '8px',
          flexShrink: 0,
          alignItems: 'flex-end',
        }}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '8px 10px',
            borderRadius: '6px',
            border: 'none',
            background: '#1a1a1a',
            color: loading ? '#666' : '#fff',
            fontSize: '13px',
            fontFamily: 'inherit',
            resize: 'none',
            maxHeight: '80px',
            minHeight: '36px',
            outline: 'none',
            boxSizing: 'border-box',
            lineHeight: '1.4',
            opacity: loading ? 0.6 : 1,
          }}
          onFocus={(e) => {
            if (!loading) {
              e.target.parentElement.style.borderColor = '#646cff';
            }
          }}
          onBlur={(e) => {
            e.target.parentElement.style.borderColor = '#333';
          }}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!prompt.trim() || loading}
          style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            minHeight: '40px',
            padding: '0',
            border: 'none',
            background: (!prompt.trim() || loading) ? '#444' : '#646cff',
            cursor: (!prompt.trim() || loading) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            opacity: (!prompt.trim() || loading) ? 0.6 : 1,
            borderRadius: '6px',
          }}
          onMouseEnter={(e) => {
            if (prompt.trim() && !loading) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = '#7b85ff';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            if (prompt.trim() && !loading) {
              e.currentTarget.style.background = '#646cff';
            }
          }}
        >
          {loading ? (
            <span style={{ animation: 'spin 0.6s linear infinite', display: 'inline-block' }}>⟳</span>
          ) : (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '10px solid #fff',
              }}
            />
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const ICONS = [
  { key: 'containerStyle', component: <ContainerStyleIcon />, label: 'Container Styles' },
  { key: 'templates', component: <TemplatesIcon />, label: 'Templates' },
  { key: 'settings', component: <SettingsIcon />, label: 'Settings' },
  { key: 'animations', component: <AnimationsIcon />, label: 'Animations' },
  { key: 'aiAnimationBuilder', component: <AiAnimationBuilderIcon />, label: 'AI Animation Builder' },
  { key: 'codeForCanvas', component: <CodeForTheCanvasIcon />, label: 'Code for Canvas' },
];

// Reusable Section Component
const EffectSection = ({ title, effects, onSelect, heightPercent = 33.33 }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: `${heightPercent}%`,
        minHeight: 0,
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        padding: '8px',
        border: '1px solid #333',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      {/* Section Title */}
      <div
        style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#aaa',
          marginBottom: '4px',
          paddingBottom: '4px',
          borderBottom: '1px solid #333',
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </div>

      {/* Scrollable Grid Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
          overflowY: 'auto',
          overflowX: 'hidden',
          flex: 1,
          minHeight: 0,
          paddingRight: '2px',
        }}
        className="effect-section-scroll"
      >
        {effects.map((effect) => (
          <button
            key={effect.key}
            onClick={() => onSelect(effect.key)}
            style={{
              padding: '4px 6px',
              borderRadius: '6px',
              border: '1px solid #444',
              backgroundColor: '#0f0f0f',
              color: '#bbb',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 400,
              transition: 'all 0.2s ease',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              textAlign: 'center',
              lineHeight: '1.1',
              minHeight: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#646cff';
              e.target.style.backgroundColor = '#1a1a1a';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#444';
              e.target.style.backgroundColor = '#0f0f0f';
              e.target.style.color = '#bbb';
            }}
          >
            {effect.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Settings Panel Component
const SettingsPanel = ({ settings, onSettingsChange }) => {
  const canvasBackgrounds = [
    { name: 'Dotted', value: 'dotted' },
    { name: 'Grid', value: 'grid' },
    { name: 'Lined', value: 'lined' },
    { name: 'Dotted Grid', value: 'dotted-grid' },
    { name: 'None', value: 'none' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '12px', overflowY: 'auto', paddingRight: '2px' }} className="effect-section-scroll">
      {/* Settings Heading */}
      <h3 style={{ 
        marginBottom: '6px', 
        color: '#fff', 
        flexShrink: 0, 
        fontSize: '14px', 
        margin: '0 0 6px 0',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        paddingBottom: '8px',
        borderBottom: '1px solid #333',
      }}>
        ⚙️ Settings
      </h3>

      {/* Theme Section */}
      <div style={{
        background: '#0f0f0f',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #333',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#ddd', marginBottom: '8px', textTransform: 'uppercase' }}>
          Theme
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onSettingsChange('theme', 'dark')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: settings.theme === 'dark' ? '2px solid #646cff' : '1px solid #444',
              backgroundColor: settings.theme === 'dark' ? '#1a1a1a' : '#0f0f0f',
              color: settings.theme === 'dark' ? '#fff' : '#bbb',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (settings.theme !== 'dark') {
                e.target.style.borderColor = '#646cff';
              }
            }}
            onMouseLeave={(e) => {
              if (settings.theme !== 'dark') {
                e.target.style.borderColor = '#444';
              }
            }}
          >
            🌙 Dark
          </button>
          <button
            onClick={() => onSettingsChange('theme', 'light')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: settings.theme === 'light' ? '2px solid #646cff' : '1px solid #444',
              backgroundColor: settings.theme === 'light' ? '#1a1a1a' : '#0f0f0f',
              color: settings.theme === 'light' ? '#fff' : '#bbb',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (settings.theme !== 'light') {
                e.target.style.borderColor = '#646cff';
              }
            }}
            onMouseLeave={(e) => {
              if (settings.theme !== 'light') {
                e.target.style.borderColor = '#444';
              }
            }}
          >
            ☀️ Light
          </button>
        </div>
      </div>

      {/* Canvas Background Section */}
      <div style={{
        background: '#0f0f0f',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #333',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#ddd', marginBottom: '8px', textTransform: 'uppercase' }}>
          Canvas Background
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {canvasBackgrounds.map((bg) => (
            <button
              key={bg.value}
              onClick={() => onSettingsChange('canvasBackground', bg.value)}
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: settings.canvasBackground === bg.value ? '2px solid #646cff' : '1px solid #444',
                backgroundColor: settings.canvasBackground === bg.value ? '#1a1a1a' : '#0f0f0f',
                color: settings.canvasBackground === bg.value ? '#fff' : '#bbb',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: 400,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (settings.canvasBackground !== bg.value) {
                  e.target.style.borderColor = '#646cff';
                }
              }}
              onMouseLeave={(e) => {
                if (settings.canvasBackground !== bg.value) {
                  e.target.style.borderColor = '#444';
                }
              }}
            >
              {bg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Color Section */}
      <div style={{
        background: '#0f0f0f',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #333',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#ddd', marginBottom: '8px', textTransform: 'uppercase' }}>
          Canvas Color
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="color"
            value={settings.canvasColor}
            onChange={(e) => onSettingsChange('canvasColor', e.target.value)}
            style={{
              width: '60px',
              height: '40px',
              borderRadius: '6px',
              border: '1px solid #444',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', color: '#aaa', marginBottom: '4px' }}>Current Color:</div>
            <div style={{
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: settings.canvasColor,
              border: '1px solid #444',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 500,
              textAlign: 'center',
            }}>
              {settings.canvasColor.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Card Selection Mode Section */}
      <div style={{
        background: '#0f0f0f',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #333',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#ddd', marginBottom: '8px', textTransform: 'uppercase' }}>
          Card Selection Mode
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onSettingsChange('selectionMode', 'single')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: settings.selectionMode === 'single' ? '2px solid #646cff' : '1px solid #444',
              backgroundColor: settings.selectionMode === 'single' ? '#1a1a1a' : '#0f0f0f',
              color: settings.selectionMode === 'single' ? '#fff' : '#bbb',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (settings.selectionMode !== 'single') {
                e.target.style.borderColor = '#646cff';
              }
            }}
            onMouseLeave={(e) => {
              if (settings.selectionMode !== 'single') {
                e.target.style.borderColor = '#444';
              }
            }}
          >
            ○ Single
          </button>
          <button
            onClick={() => onSettingsChange('selectionMode', 'multiple')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: settings.selectionMode === 'multiple' ? '2px solid #646cff' : '1px solid #444',
              backgroundColor: settings.selectionMode === 'multiple' ? '#1a1a1a' : '#0f0f0f',
              color: settings.selectionMode === 'multiple' ? '#fff' : '#bbb',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (settings.selectionMode !== 'multiple') {
                e.target.style.borderColor = '#646cff';
              }
            }}
            onMouseLeave={(e) => {
              if (settings.selectionMode !== 'multiple') {
                e.target.style.borderColor = '#444';
              }
            }}
          >
            ◻ Multiple
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          onSettingsChange('resetAll', true);
        }}
        style={{
          padding: '10px 16px',
          borderRadius: '6px',
          border: '1px solid #444',
          backgroundColor: '#0f0f0f',
          color: '#ff6b6b',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#ff6b6b';
          e.target.style.backgroundColor = '#1a0f0f';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = '#444';
          e.target.style.backgroundColor = '#0f0f0f';
        }}
      >
        🔄 Reset to Defaults
      </button>
    </div>
  );
};

function Sidebar({ onApplyAnimation, onSettingsChange, selectedCards = [], cards = [], cardStyle = {}, appSettings = {} }) {
  const [activePanel, setActivePanel] = useState(null);
  const [infoTemplate, setInfoTemplate] = useState(null);
  const [templateSearch, setTemplateSearch] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'dark',
    canvasBackground: 'dotted',
    canvasColor: '#232323',
    selectionMode: 'single',
  });

  const handleIconClick = (key) => {
    if (key === 'codeForCanvas') {
      setIsCodeModalOpen(true);
    } else {
      setActivePanel(activePanel === key ? null : key);
    }
  };

  const handleAnimationSelect = (key) => {
    onApplyAnimation && onApplyAnimation(key);
  };

  const handleHoverSelect = (key) => {
    onApplyAnimation && onApplyAnimation(undefined, key);
  };

  const handleTransitionSelect = (key) => {
    onApplyAnimation && onApplyAnimation(undefined, undefined, key);
  };

  const handleSettingsChange = (key, value) => {
    let newSettings = { ...settings };

    if (key === 'resetAll') {
      newSettings = {
        theme: 'dark',
        canvasBackground: 'dotted',
        canvasColor: '#232323',
        selectionMode: 'single',
      };
    } else {
      newSettings[key] = value;
    }

    setSettings(newSettings);
    onSettingsChange && onSettingsChange(newSettings);
  };

  return (
    <div className="sidebar-container" style={{ display: 'flex', flexDirection: 'row', height: '100%', flexShrink: '0', gap: '8px' }}>
      {/* Sidebar Icons */}
      <div
        className="sidebar"
        style={{
          minWidth: '60px',
          backgroundColor: '#1d1d1dff',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          paddingTop: '15px',
          height: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        {ICONS.map((icon) => (
          <div
            key={icon.key}
            onClick={() => handleIconClick(icon.key)}
            style={{
              cursor: 'pointer',
              filter: activePanel === icon.key ? 'brightness(1.4)' : 'brightness(1)',
              transition: 'filter 0.2s ease',
            }}
            title={icon.label}
          >
            {icon.component}
          </div>
        ))}
      </div>

      {/* Inline Side Panel */}
      {activePanel && (
        <div className="sidePanel" style={{
          minWidth: '320px',
          maxWidth: '420px',
          flex: 1,
          height: '100%',
          background: '#1a1a1a',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          padding: '8px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          border: '1px solid #333',
          boxSizing: 'border-box',
          overflow: 'hidden',
          gap: '4px',
        }}>
          {/* Close Button */}
          <button
            onClick={() => setActivePanel(null)}
            style={{
              alignSelf: 'flex-end',
              background: 'transparent',
              color: '#fff',
              fontSize: '1.3em',
              cursor: 'pointer',
              border: 'none',
              padding: '0',
              margin: '0',
              transition: 'color 0.2s ease',
              flexShrink: 0,
              lineHeight: '1',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => e.target.style.color = '#646cff'}
            onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            ×
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '4px', overflow: 'hidden' }}>
            {activePanel === 'containerStyle' && <ContainerStylesPanel appSettings={appSettings} onSettingsChange={onSettingsChange} />}

            {activePanel === 'templates' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
                {/* Template Heading */}
                <h3 style={{ marginBottom: '6px', color: '#fff', flexShrink: 0, fontSize: '12px', margin: '0 0 6px 0' }}>Templates</h3>
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search templates..."
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '6px',
                    border: 'none',
                    marginBottom: '8px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                  }}
                  onChange={e => setTemplateSearch(e.target.value)}
                />
                {/* Templates List with Search */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    flex: 1,
                    minHeight: 0,
                    paddingRight: '2px',
                  }}
                  className="effect-section-scroll"
                >
                  {templatesList
                    .filter(template =>
                      template.name.toLowerCase().includes((templateSearch || '').toLowerCase())
                    )
                    .map(template => (
                      <div
                        key={template.key}
                        style={{
                          background: '#0f0f0f',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px #0006',
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '1px solid #333',
                          flexShrink: 0,
                        }}
                      >
                        {/* Preview Block */}
                        <div style={{
                          minWidth: '50px',
                          minHeight: '50px',
                          maxWidth: '50px',
                          maxHeight: '50px',
                          borderRadius: template.style.borderRadius || '10px',
                          boxShadow: template.style.boxShadow || '0 2px 8px #0003',
                          background: template.style.background,
                          color: template.style.color,
                          fontFamily: template.style.fontFamily,
                          fontWeight: template.style.fontWeight,
                          fontSize: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          border: '1px solid #444',
                          transition: template.style.transition,
                          flexShrink: 0,
                        }}>
                          {template.name.split(' ')[0]}
                        </div>
                        {/* Info and Use Buttons */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#fff', marginBottom: '2px' }}>{template.name}</div>
                          <div style={{ fontSize: '9px', opacity: 0.7, color: '#ccc', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {template.description.slice(0, 30)}...
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              style={{
                                padding: '3px 8px',
                                borderRadius: '4px',
                                border: '1px solid #444',
                                background: '#0f0f0f',
                                color: '#ccc',
                                cursor: 'pointer',
                                fontSize: '9px',
                                transition: 'all 0.2s ease',
                                flex: 1,
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.borderColor = '#646cff';
                                e.target.style.color = '#fff';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.borderColor = '#444';
                                e.target.style.color = '#ccc';
                              }}
                              onClick={() => setInfoTemplate(template)}
                            >
                              Info
                            </button>
                            <button
                              style={{
                                padding: '3px 8px',
                                borderRadius: '4px',
                                border: 'none',
                                background: '#00f2fe',
                                color: '#222',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '9px',
                                transition: 'all 0.2s ease',
                                flex: 1,
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                              }}
                              onClick={() => onApplyAnimation &&
                                onApplyAnimation(template.animation, undefined, undefined, template.style)}
                            >
                              Use
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activePanel === 'settings' && (
              <SettingsPanel 
                settings={settings} 
                onSettingsChange={handleSettingsChange}
              />
            )}

            {activePanel === 'animations' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '4px', overflow: 'hidden' }}>
                {/* Animations Section - 35% */}
                <EffectSection
                  title="Animations"
                  effects={animationList}
                  onSelect={handleAnimationSelect}
                  heightPercent={35}
                />

                {/* Hover Effects Section - 33% */}
                <EffectSection
                  title="Hover Effects"
                  effects={hoverEffectsList}
                  onSelect={handleHoverSelect}
                  heightPercent={33}
                />

                {/* Transitions Section - 32% */}
                <EffectSection
                  title="Transitions"
                  effects={transitionsList}
                  onSelect={handleTransitionSelect}
                  heightPercent={32}
                />
              </div>
            )}

            {activePanel === 'aiAnimationBuilder' && <AIAnimationBuilderPanel onApplyAnimation={onApplyAnimation} />}
          </div>
        </div>
      )}

      {/* Code Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        selectedCards={selectedCards}
        cards={cards}
        cardStyle={cardStyle}
      />
    </div>
  );
}

export { Sidebar };
