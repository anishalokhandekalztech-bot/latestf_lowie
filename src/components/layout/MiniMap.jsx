import React, { useRef } from "react";
import { Card } from "../UI/Card";

function MiniMap({ cardStyle, setCardStyle }) {
  const mapRef = useRef(null);

  // Get actual size from DOM for 100% accuracy
  const getMapSize = () => {
    if (mapRef.current) {
      return mapRef.current.offsetWidth;
    }
    // Fallback to default
    return 240;
  };

  const CARD_SIZE = 40;

  const getMiniCardPos = () => {
    const mapSize = getMapSize();
    const top = cardStyle.top ? parseFloat(cardStyle.top) : 50;
    const left = cardStyle.left ? parseFloat(cardStyle.left) : 50;
    return {
      top: (mapSize * top) / 100 - CARD_SIZE / 2,
      left: (mapSize * left) / 100 - CARD_SIZE / 2,
      topPercent: top,
      leftPercent: left,
      mapSize,
    };
  };

  const { top, left, topPercent, leftPercent, mapSize } = getMiniCardPos();

  const getRelativeOpacity = (value, center = 50) => {
    return Math.min(1, Math.abs(value - center) / 50);
  };

  const leftOpacity = leftPercent < 50 ? getRelativeOpacity(leftPercent, 50) : 0;
  const rightOpacity = leftPercent > 50 ? getRelativeOpacity(leftPercent, 50) : 0;
  const topOpacity = topPercent < 50 ? getRelativeOpacity(topPercent, 50) : 0;
  const bottomOpacity = topPercent > 50 ? getRelativeOpacity(topPercent, 50) : 0;

  const getLabelStyle = (opacity) => ({
    color: `rgba(255,255,255,${0.12 + 0.88 * opacity})`,
    fontSize: "14px",
    fontWeight: "bold",
    position: "absolute",
    pointerEvents: "none",
    zIndex: 3,
    transition: "color 0.2s",
    userSelect: "none",
  });

  const handleDrag = (e) => {
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const leftPercent = Math.max(0, Math.min(100, (x / mapSize) * 100));
    const topPercent = Math.max(0, Math.min(100, (y / mapSize) * 100));

    setCardStyle((prev) => ({
      ...prev,
      left: leftPercent + "%",
      top: topPercent + "%",
    }));
  };

  return (
    <div
      className="mini-map-container"
      ref={mapRef}
      onClick={handleDrag}
      onMouseDown={(e) => {
        const move = (ev) => handleDrag(ev);
        const up = () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", up);
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
      }}
    >
      <div
        style={{
          ...getLabelStyle(topOpacity),
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Top
      </div>
      <div
        style={{
          ...getLabelStyle(leftOpacity),
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        Left
      </div>
      <div
        style={{
          ...getLabelStyle(rightOpacity),
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        Right
      </div>
      <div
        style={{
          ...getLabelStyle(bottomOpacity),
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Bottom
      </div>
      <div
        className="mini-map-card-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top,
            left,
            width: CARD_SIZE,
            height: CARD_SIZE,
            cursor: "grab",
            zIndex: 4,
            pointerEvents: "auto",
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = left;
            const startTop = top;

            const move = (ev) => {
              const dx = ev.clientX - startX;
              const dy = ev.clientY - startY;
              const newLeft = Math.max(
                0,
                Math.min(mapSize - CARD_SIZE, startLeft + dx)
              );
              const newTop = Math.max(
                0,
                Math.min(mapSize - CARD_SIZE, startTop + dy)
              );
              const leftPercent = ((newLeft + CARD_SIZE / 2) / mapSize) * 100;
              const topPercent = ((newTop + CARD_SIZE / 2) / mapSize) * 100;
              setCardStyle((prev) => ({
                ...prev,
                left: leftPercent + "%",
                top: topPercent + "%",
              }));
            };
            const up = () => {
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", up);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
          }}
        >
          <Card
            style={{
              width: CARD_SIZE + "px",
              height: CARD_SIZE + "px",
              borderRadius: cardStyle.borderRadius || "6px",
              background: cardStyle.background || "#101010ff",
              color: cardStyle.color || "#fff",
              position: "static",
              transform: "none",
              fontSize: "10px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { MiniMap };