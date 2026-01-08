import React, { useState, useEffect } from "react";
import './index.css';
import Logo from "./assets/Logos/logo.svg";
import { Sidebar } from './components/layout/Sidebar';
import { Canvas } from './components/layout/Canvas';
import { PropertiesPannel } from './components/layout/PropertiesPannel';
import { injectAnimations } from './animations/injectAnimations';
import { injectHoverEffects } from './hover_effects/inject_hover_effects';
import { injectTransitions } from './transitions/inject_transitions';

function App() {
  const [cardStyle, setCardStyle] = useState({
    width: "150px",
    height: "150px",
    borderRadius: "16px",
    color: "#ffffff",
    background: "#101010ff",
  });
  const [selectedCards, setSelectedCards] = useState([]);
  const [flexStyle, setFlexStyle] = useState({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '10px',
    flexWrap: 'wrap'
  });

  const [cards, setCards] = useState(() => ([
    {
      id: 1,
      label: "Card 1",
      pos: { x: 20, y: 20 },
      styleOverrides: {},
      floating: false,
      textItems: ["Card 1"],
      imageData: null,
    }
  ]));

  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  const [appSettings, setAppSettings] = useState({
    theme: 'dark',
    canvasBackground: 'dotted',
    canvasColor: '#232323',
    selectionMode: 'single',
    primaryBackground: '#101010',
    secondaryBackground: '#1d1d1d',
    textColor: '#ffffff',
    accentColor: '#646cff',
    borderColor: '#333333',
    cardBackground: '#101010ff',
  });

  // compute aggregated style for PropertiesPannel:
  const aggregatedCardStyle = (() => {
    if (selectedCards.length === 1) {
      return { ...cardStyle, ...cards.find(c => c.id === selectedCards[0])?.styleOverrides };
    }
    if (selectedCards.length > 1) {
      const keys = ['width', 'height', 'borderRadius', 'color', 'background'];
      const selected = cards.filter(c => selectedCards.includes(c.id));
      const result = {};
      keys.forEach(key => {
        const vals = selected.map(c => (c.styleOverrides && c.styleOverrides[key] !== undefined) ? c.styleOverrides[key] : cardStyle[key]);
        const allEqual = vals.every(v => v === vals[0]);
        result[key] = allEqual ? vals[0] : "";
      });
      return result;
    }
    return cardStyle;
  })();

  const handleAddContainer = () => {
    setCards(prev => {
      const id = prev.length ? Math.max(...prev.map(c => c.id)) + 1 : 1;
      return [
        ...prev,
        {
          id,
          label: `Card ${id}`,
          pos: { x: 20, y: 20 },
          styleOverrides: {},
          floating: false,
          textItems: [`Card ${id}`],
          imageData: null,
        }
      ];
    });
  };

  // Called when a card's position is changed during drag
  const updateCardPos = (id, pos) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, pos } : c));
  };

  // Called when drag begins so we mark card as floating (removed from flex)
  const handleStartDrag = (id, startPos) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, floating: true, pos: startPos } : c));
  };

  // When user updates flex properties, return all cards to flex flow
  useEffect(() => {
    setCards(prev => prev.map(c => ({ ...c, floating: false })));
  }, [flexStyle.flexDirection, flexStyle.justifyContent, flexStyle.alignItems, flexStyle.gap, flexStyle.flexWrap]);

  // Add this new handler for card style changes (clamp sizes)
  const handleCardStyleChange = (changes) => {
    const normalized = {};
    Object.entries(changes).forEach(([k, v]) => {
      if (k === 'height' || k === 'width' || k === 'borderRadius') {
        const n = parseInt(String(v).replace('px', ''), 10) || 0;
        if (k === 'borderRadius') {
          normalized[k] = `${Math.max(0, n)}px`;
        } else {
          normalized[k] = `${Math.max(50, n)}px`;
        }
      } else {
        normalized[k] = v;
      }
    });

    setCards(prevCards => prevCards.map(card => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          styleOverrides: {
            ...card.styleOverrides,
            ...normalized
          }
        };
      }
      return card;
    }));
  };

  const handleDeleteCard = () => {
    setCards(prev => prev.filter(card => !selectedCards.includes(card.id)));
    setSelectedCards([]);
  };

  // Handle card duplication
  const handleDuplicate = () => {
    setCards(prev => {
      // Get cards to duplicate: selected cards if any, otherwise all cards
      const cardsToDuplicate = selectedCards.length > 0
        ? prev.filter(card => selectedCards.includes(card.id))
        : prev;

      // Find max ID
      const maxId = Math.max(...prev.map(c => c.id));

      // Create duplicated cards
      const duplicatedCards = cardsToDuplicate.map((card, index) => ({
        ...card,
        id: maxId + index + 1,
        label: card.label ? `${card.label} (Copy)` : `Card ${maxId + index + 1}`,
        pos: card.floating ? { x: card.pos.x + 20, y: card.pos.y + 20 } : card.pos,
        textItems: [...(card.textItems || [])],
        styleOverrides: { ...card.styleOverrides },
      }));

      // Return updated cards array with duplicates added
      return [...prev, ...duplicatedCards];
    });
    // Deselect cards after duplication
    setSelectedCards([]);
  };

  // Add new text item to selected card
  const handleAddTextItem = (newText) => {
    setCards(prevCards => prevCards.map(card => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          textItems: [...(card.textItems || []), newText]
        };
      }
      return card;
    }));
  };

  // Update specific text item in selected card
  const handleUpdateTextItem = (index, newText) => {
    setCards(prevCards => prevCards.map(card => {
      if (selectedCards.includes(card.id)) {
        const updatedItems = [...(card.textItems || [])];
        updatedItems[index] = newText;
        return {
          ...card,
          textItems: updatedItems
        };
      }
      return card;
    }));
  };

  // Delete specific text item from selected card
  const handleDeleteTextItem = (index) => {
    setCards(prevCards => prevCards.map(card => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          textItems: card.textItems.filter((_, i) => i !== index)
        };
      }
      return card;
    }));
  };

  // Handle image upload
  const handleUploadImage = (imageData) => {
    setCards(prevCards => prevCards.map(card => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          imageData: imageData
        };
      }
      return card;
    }));
  };

  // Handle image deletion
  const handleDeleteImage = () => {
    setCards(prevCards => prevCards.map(card => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          imageData: null
        };
      }
      return card;
    }));
  };

  useEffect(() => {
    const handleUpdateCardStyle = (event) => {
      const { cardId, styles } = event.detail;
      setCards(prevCards => prevCards.map(card => {
        if (card.id === cardId) {
          return {
            ...card,
            styleOverrides: {
              ...card.styleOverrides,
              ...styles
            }
          };
        }
        return card;
      }));
    };

    window.addEventListener('updateCardStyle', handleUpdateCardStyle);
    return () => window.removeEventListener('updateCardStyle', handleUpdateCardStyle);
  }, []);

  useEffect(() => {
    injectAnimations();
    injectHoverEffects();
    injectTransitions();
  }, []);

  // Add this handler:
  const handleApplyAnimation = (animationKey, hoverKey, transitionKey, templateStyle) => {
    setCards(prevCards =>
      prevCards.map(card =>
        selectedCards.includes(card.id)
          ? {
              ...card,
              animation: animationKey !== undefined ? animationKey : card.animation,
              hoverEffect: hoverKey !== undefined ? hoverKey : card.hoverEffect,
              transition: transitionKey !== undefined ? transitionKey : card.transition,
              transitionActive: transitionKey !== undefined ? false : card.transitionActive,
              styleOverrides: templateStyle || card.styleOverrides
            }
          : card
      )
    );
    // For transitions: trigger .trans-active after a short delay
    if (transitionKey) {
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            selectedCards.includes(card.id)
              ? { ...card, transitionActive: true }
              : card
          )
        );
      }, 50);
    }
  };

  // Handle settings change from Sidebar
  const handleSettingsChange = (newSettings) => {
    setAppSettings(newSettings);
  };

  // Apply theme to document
  useEffect(() => {
    if (appSettings.theme === 'light') {
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    } else {
      document.documentElement.style.setProperty('--bg-color', '#101010');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.body.style.backgroundColor = '#101010';
      document.body.style.color = '#ffffff';
    }
  }, [appSettings.theme]);

  // Pass handleApplyAnimation to Sidebar/Animations panel:
  return (
    <>
      <div className='headerlogo'>
        <img src={Logo} alt="" className='logo' />
        <h2 className='name'>Flowie KalzTech</h2>
      </div>
      <div className='container'>
        <div className='main-content'>
          <Sidebar 
            onApplyAnimation={handleApplyAnimation} 
            onSettingsChange={handleSettingsChange}
            selectedCards={selectedCards}
            cards={cards}
            cardStyle={cardStyle}
            appSettings={appSettings}
          />
          <Canvas
            cardStyle={cardStyle}
            cards={cards}
            onAddContainer={handleAddContainer}
            onUpdateCardPos={updateCardPos}
            onStartDrag={handleStartDrag}
            selectedCards={selectedCards}
            onSelectCard={setSelectedCards}
            flexStyle={flexStyle}
            onDeleteCard={handleDeleteCard}
            onDuplicate={handleDuplicate}
            onAddTextItem={handleAddTextItem}
            onUpdateTextItem={handleUpdateTextItem}
            onDeleteTextItem={handleDeleteTextItem}
            onUploadImage={handleUploadImage}
            onDeleteImage={handleDeleteImage}
            onCanvasDimensionsChange={setCanvasDimensions}
            canvasDimensions={canvasDimensions}
            appSettings={appSettings}
          />
          <PropertiesPannel
            cardStyle={aggregatedCardStyle}
            setCardStyle={handleCardStyleChange}
            selectedCards={selectedCards}
            flexStyle={flexStyle}
            setFlexStyle={setFlexStyle}
          />
        </div>
      </div>
    </>
  );
}

export default App;
