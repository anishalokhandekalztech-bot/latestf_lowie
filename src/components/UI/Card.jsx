import React, { useState, useRef, useEffect } from 'react';

function Card({ style = {}, children, animation, hoverEffect, transition, transitionActive, ...rest }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const cardRect = cardRef.current.getBoundingClientRect();
    const parentRect = cardRef.current.parentElement.getBoundingClientRect();

    dragOffset.current = {
      x: e.clientX - cardRect.left,
      y: e.clientY - cardRect.top
    };

    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const parentRect = cardRef.current.parentElement.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const [isTransitioned, setIsTransitioned] = useState(false);

  useEffect(() => {
    if (transition) {
      setIsTransitioned(false);
      // Trigger transition after a short delay for effect
      setTimeout(() => setIsTransitioned(true), 50);
    }
  }, [transition]);

  const cardStyle = {
    position: 'relative',
    width: style.width || '150px',
    height: style.height || '150px',
    backgroundColor: style.background || '#101010ff',
    borderRadius: style.borderRadius || '16px',
    color: style.color || '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    touchAction: 'none',
    zIndex: isDragging ? 1000 : 1,
    padding: style.padding || '10px',
    fontSize: style.fontSize || '14px',
    fontWeight: style.fontWeight || 'normal',
    textAlign: style.textAlign || 'center',
    border: style.border || '2px solid transparent',
    borderColor: style.borderColor || 'transparent',
    boxShadow: style.boxShadow || 'none',
    opacity: style.opacity || 1,
    transform: style.transform || 'scale(1)',
    transition: style.transition || 'none',
    ...style,
  };

  return (
    <div
      ref={cardRef}
      style={style}
      className={
        `Card${animation ? ` anim-${animation}` : ''}` +
        `${hoverEffect ? ` hover-${hoverEffect}` : ''}` +
        `${transition ? ` trans-${transition}` : ''}` +
        `${transition && transitionActive ? ' trans-active' : ''}`
      }
      {...rest}
    >
      {children}
    </div>
  );
}

export { Card };
