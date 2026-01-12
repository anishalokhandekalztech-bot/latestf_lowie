import React, { useRef, useEffect, useState } from "react";
import { FloatingBar } from "../UI/FloatingBar";
import { Card } from "../UI/Card";

function Canvas({
  cardStyle,
  cards = [],
  onAddContainer,
  onUpdateCardPos,
  onStartDrag,
  selectedCards = [],
  onSelectCard,
  flexStyle = {},
  onDeleteCard,
  onDuplicate,
  onAddTextItem,
  onUpdateTextItem,
  onDeleteTextItem,
  onUploadImage,
  onDeleteImage,
  onCanvasDimensionsChange,
  canvasDimensions,
  appSettings = {},
}) {
  const containerRef = useRef(null);
  const flexContainerRef = useRef(null);
  const [needsResponsiveSize, setNeedsResponsiveSize] = useState(false);

  const dragRef = useRef({
    draggingId: null,
    pointerId: null,
    startPointer: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
  });

  // Calculate if responsive sizing is needed and check if canvas is full
  const shouldApplyResponsiveSize = () => {
    if (!flexContainerRef.current) return false;

    const container = flexContainerRef.current;
    const padding = 20;
    const gap = parseInt(flexStyle.gap) || 10;
    const nonFloatingCards = cards.filter(c => !c.floating).length;

    if (nonFloatingCards === 0) return false;

    const baseCardWidth = parseInt(cardStyle.width) || 150;
    const baseCardHeight = parseInt(cardStyle.height) || 150;
    const containerWidth = container.clientWidth - padding * 2;
    const containerHeight = container.clientHeight - padding * 2;

    if (flexStyle.flexDirection === 'column' || flexStyle.flexDirection === 'column-reverse') {
      // For column: DON'T resize - let flexWrap handle wrapping to new columns
      // Cards stay original size, naturally wrap when height is exceeded
      return false;
    } else {
      // For row: check if cards exceed width, then wrap to new row
      const cardsPerRow = Math.max(1, Math.floor((containerWidth + gap) / (baseCardWidth + gap)));
      const numRows = Math.ceil(nonFloatingCards / cardsPerRow);
      const totalHeight = (baseCardHeight + gap) * numRows - gap;
      return totalHeight > containerHeight;
    }
  };

  // Check and update responsive size requirement
  useEffect(() => {
    const checkResponsive = () => {
      setNeedsResponsiveSize(shouldApplyResponsiveSize());
    };

    checkResponsive();
    const timer = setTimeout(checkResponsive, 100);
    return () => clearTimeout(timer);
  }, [cards.length, flexStyle.flexDirection, flexStyle.gap, canvasDimensions, cardStyle.width, cardStyle.height]);

  // Observe container size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        onCanvasDimensionsChange({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
        setNeedsResponsiveSize(shouldApplyResponsiveSize());
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Get responsive card size if needed
  const getResponsiveCardSize = () => {
    if (!needsResponsiveSize || !flexContainerRef.current) return null;

    const container = flexContainerRef.current;
    const padding = 20;
    const gap = parseInt(flexStyle.gap) || 10;
    const nonFloatingCards = cards.filter(c => !c.floating).length;

    if (nonFloatingCards === 0) return null;

    const containerHeight = container.clientHeight - padding * 2;
    const baseCardHeight = parseInt(cardStyle.height) || 150;

    // Only for row direction - scale height when multiple rows needed
    const cardsPerRow = Math.max(1, Math.floor((container.clientWidth - padding * 2 + gap) / (parseInt(cardStyle.width) || 150 + gap)));
    const numRows = Math.ceil(nonFloatingCards / cardsPerRow);
    const totalGapHeight = gap * (numRows - 1);
    
    const newHeight = Math.max(50, Math.floor((containerHeight - totalGapHeight) / numRows));

    return {
      width: `${parseInt(cardStyle.width) || 150}px`,
      height: `${newHeight}px`,
    };
  };

  // Get background pattern based on settings
  const getCanvasBackground = () => {
    const bgType = appSettings.canvasBackground || 'dotted';
    const bgColor = appSettings.canvasColor || '#232323';

    const patterns = {
      dotted: {
        backgroundColor: bgColor,
        backgroundImage: 'radial-gradient(rgba(123, 123, 123, 0.3) 1px, transparent 1px)',
        backgroundSize: '15px 15px',
      },
      grid: {
        backgroundColor: bgColor,
        backgroundImage: 
          'linear-gradient(rgba(123, 123, 123, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 123, 123, 0.2) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      },
      lined: {
        backgroundColor: bgColor,
        backgroundImage: 'linear-gradient(90deg, rgba(123, 123, 123, 0.2) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      },
      'dotted-grid': {
        backgroundColor: bgColor,
        backgroundImage: 
          'radial-gradient(rgba(123, 123, 123, 0.3) 1px, transparent 1px), linear-gradient(rgba(123, 123, 123, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 123, 123, 0.1) 1px, transparent 1px)',
        backgroundSize: '15px 15px, 20px 20px, 20px 20px',
      },
      none: {
        backgroundColor: bgColor,
        backgroundImage: 'none',
      },
    };

    return patterns[bgType] || patterns.dotted;
  };

  const CanvasStyle = {
    flexGrow: 1,
    borderRadius: '10px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    ...getCanvasBackground(),
  };

  const processedFlexStyle = {
    ...flexStyle,
    gap: typeof flexStyle.gap === "number" ? `${flexStyle.gap}px` : flexStyle.gap || "10px",
  };

  const flexContainerStyle = {
    display: "flex",
    width: "100%",
    height: "calc(100% - 70px)",
    padding: "20px",
    overflow: "hidden",
    flexWrap: "wrap",
    justifyContent: processedFlexStyle.justifyContent || "flex-start",
    alignItems: processedFlexStyle.alignItems || "stretch",
    flexDirection: processedFlexStyle.flexDirection || "row",
    gap: processedFlexStyle.gap,
    position: "relative",
    alignContent: "flex-start",
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const getPointerOffset = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: e.clientX, y: e.clientY };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  function onPointerMove(e) {
    const d = dragRef.current;
    if (d.draggingId === null || e.pointerId !== d.pointerId) return;
    const offset = getPointerOffset(e);
    const dx = offset.x - d.startPointer.x;
    const dy = offset.y - d.startPointer.y;
    const newPos = { x: Math.round(d.startPos.x + dx), y: Math.round(d.startPos.y + dy) };
    onUpdateCardPos && onUpdateCardPos(d.draggingId, newPos);
  }

  function onPointerUp(e) {
    const d = dragRef.current;
    if (d.draggingId === null || e.pointerId !== d.pointerId) return;
    try {
      const el = document.getElementById(`card-wrapper-${d.draggingId}`);
      el && el.releasePointerCapture && el.releasePointerCapture(d.pointerId);
      el && (el.style.zIndex = "");
    } catch (err) {}
    dragRef.current = { draggingId: null, pointerId: null, startPointer: { x: 0, y: 0 }, startPos: { x: 0, y: 0 } };
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  const startDrag = (card, e, exactPos) => {
    onStartDrag && onStartDrag(card.id, exactPos);

    const offset = getPointerOffset(e);
    const startPos = exactPos ? { x: Math.round(exactPos.x), y: Math.round(exactPos.y) } : { x: card.pos?.x || 0, y: card.pos?.y || 0 };

    dragRef.current = {
      draggingId: card.id,
      pointerId: e.pointerId,
      startPointer: offset,
      startPos,
    };

    const wrapperEl = document.getElementById(`card-wrapper-${card.id}`);
    try {
      wrapperEl && wrapperEl.setPointerCapture && wrapperEl.setPointerCapture(e.pointerId);
      wrapperEl && (wrapperEl.style.zIndex = 1000);
    } catch (err) {}

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handlePointerDown = (card, e) => {
    if (e.button !== 0) return;
    e.preventDefault();

    if (typeof onSelectCard === "function") {
      if (e.ctrlKey || e.metaKey) {
        if (selectedCards.includes(card.id)) {
          onSelectCard(selectedCards.filter((id) => id !== card.id));
        } else {
          onSelectCard([...selectedCards, card.id]);
        }
      } else {
        onSelectCard([card.id]);
      }
    }

    const initialPointerPos = getPointerOffset(e);
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    const moveHandler = (moveEvent) => {
      const currentPos = getPointerOffset(moveEvent);
      const dx = Math.abs(currentPos.x - initialPointerPos.x);
      const dy = Math.abs(currentPos.y - initialPointerPos.y);
      
      if (dx > 5 || dy > 5) {
        const exactPos = containerRect ? {
          x: Math.round(rect.left - containerRect.left + (containerRef.current?.scrollLeft || 0)),
          y: Math.round(rect.top - containerRect.top + (containerRef.current?.scrollTop || 0))
        } : {
          x: Math.round(rect.left),
          y: Math.round(rect.top)
        };
        
        startDrag(card, e, exactPos);
        window.removeEventListener('pointermove', moveHandler);
      }
    };

    window.addEventListener('pointermove', moveHandler);
    window.addEventListener('pointerup', () => {
      window.removeEventListener('pointermove', moveHandler);
    }, { once: true });
  };

  const responsiveSize = getResponsiveCardSize();

  return (
    <div style={CanvasStyle} className="canvas" ref={containerRef}>
      <FloatingBar 
        onAddContainer={onAddContainer}
        onDuplicate={onDuplicate}
        onDeleteCard={onDeleteCard}
        selectedCards={selectedCards}
        onSelectCard={onSelectCard}
        onAddTextItem={onAddTextItem}
        onUpdateTextItem={onUpdateTextItem}
        onDeleteTextItem={onDeleteTextItem}
        onUploadImage={onUploadImage}
        onDeleteImage={onDeleteImage}
        cards={cards}
      />
      <div 
        className="flex-container" 
        style={flexContainerStyle} 
        ref={flexContainerRef}
        onClick={(e) => {
          // Only deselect if clicking on the empty canvas (not on a card)
          if (e.target === flexContainerRef.current) {
            onSelectCard([]);
          }
        }}
      >
        {cards.map((card) => {
          const isSelected = selectedCards.includes(card.id);
          
          // Check if user has set any style overrides
          const hasStyleOverrides = card.styleOverrides && Object.keys(card.styleOverrides).length > 0;
          
          // Determine the card size - respect user overrides completely
          let cardSize = { width: cardStyle.width, height: cardStyle.height };
          
          // Only apply responsive sizing if:
          // 1. Card is not floating
          // 2. Responsive size is calculated
          // 3. User hasn't set any style overrides at all
          if (!card.floating && responsiveSize && !hasStyleOverrides) {
            cardSize = responsiveSize;
          }

          const mergedStyle = {
            ...cardStyle,
            ...cardSize,
            ...card.styleOverrides,
            outline: isSelected ? "2px solid #FFD700" : "none",
            outlineOffset: "2px",
            position: "relative",
            cursor: "grab",
            margin: 0,
            transition: "outline-color 0.2s ease",
          };

          const textContent = card.textItems && card.textItems.length > 0
            ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  height: '100%',
                }}>
                  {card.imageData && (
                    <img 
                      src={card.imageData} 
                      alt="card" 
                      style={{
                        maxWidth: '80%',
                        maxHeight: '60%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '4px'
                      }}
                    />
                  )}
                  {card.textItems.map((text, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        lineHeight: '1.2',
                        wordBreak: 'break-word',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: card.floating ? undefined : 'clamp(10px, 2vw, 14px)',
                      }}
                    >
                      {text}
                    </div>
                  ))}
                </div>
              )
            : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  gap: '8px',
                }}>
                  {card.imageData && (
                    <img 
                      src={card.imageData} 
                      alt="card" 
                      style={{
                        maxWidth: '80%',
                        maxHeight: '60%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <span>{card.label}</span>
                </div>
              );

          if (card.floating) {
            const absStyle = {
              position: "absolute",
              left: card.pos?.x || 0,
              top: card.pos?.y || 0,
              width: mergedStyle.width,
              height: mergedStyle.height,
              zIndex: isSelected ? 1000 : 1,
            };
            return (
              <div
                id={`card-wrapper-${card.id}`}
                key={card.id}
                style={absStyle}
                onPointerDown={(e) => handlePointerDown(card, e)}
              >
                <Card
                  style={{ ...mergedStyle, position: "relative" }}
                  animation={card.animation}
                  initPos={card.pos}
                  hoverEffect={card.hoverEffect}
                  onDragEnd={(pos) => onUpdateCardPos && onUpdateCardPos(card.id, pos)}
                  draggable={false}
                >
                  {textContent}
                </Card>
              </div>
            );
          }

          return (
            <div
              id={`card-wrapper-${card.id}`}
              key={card.id}
              style={{
                position: "relative",
                display: "inline-flex",
                width: cardSize.width,
                height: cardSize.height,
                zIndex: isSelected ? 2 : 1,
                flex: '0 0 auto',
              }}
              onPointerDown={(e) => handlePointerDown(card, e)}
            >
              <Card
                style={mergedStyle}
                animation={card.animation}
                hoverEffect={card.hoverEffect}
                transition={card.transition}
                transitionActive={card.transitionActive}
                draggable={false}
              >
                {textContent}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Canvas };
