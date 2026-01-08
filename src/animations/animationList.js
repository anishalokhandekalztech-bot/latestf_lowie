export const animationList = [
  // Card Entrance Animations
  {
    name: "Fade In",
    key: "cardFadeIn",
    css: `
      @keyframes cardFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .anim-cardFadeIn {
        animation: cardFadeIn 0.7s ease both;
      }
    `
  },
  {
    name: "Slide In",
    key: "cardSlideIn",
    css: `
      @keyframes cardSlideIn {
        from { transform: translateX(-40px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .anim-cardSlideIn {
        animation: cardSlideIn 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Slide Up",
    key: "cardSlideUp",
    css: `
      @keyframes cardSlideUp {
        from { transform: translateY(40px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .anim-cardSlideUp {
        animation: cardSlideUp 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Slide Down",
    key: "cardSlideDown",
    css: `
      @keyframes cardSlideDown {
        from { transform: translateY(-40px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .anim-cardSlideDown {
        animation: cardSlideDown 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Pop In",
    key: "cardPopIn",
    css: `
      @keyframes cardPopIn {
        0% { transform: scale(0.5); opacity: 0; }
        80% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); }
      }
      .anim-cardPopIn {
        animation: cardPopIn 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Zoom In",
    key: "cardZoomIn",
    css: `
      @keyframes cardZoomIn {
        from { transform: scale(0.7); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .anim-cardZoomIn {
        animation: cardZoomIn 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Grow In",
    key: "cardGrowIn",
    css: `
      @keyframes cardGrowIn {
        from { transform: scaleY(0.2); opacity: 0; }
        to { transform: scaleY(1); opacity: 1; }
      }
      .anim-cardGrowIn {
        animation: cardGrowIn 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Drop In",
    key: "cardDropIn",
    css: `
      @keyframes cardDropIn {
        0% { transform: translateY(-80px) scaleY(0.8); opacity: 0; }
        80% { transform: translateY(10px) scaleY(1.05); opacity: 1; }
        100% { transform: translateY(0) scaleY(1); }
      }
      .anim-cardDropIn {
        animation: cardDropIn 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Roll In",
    key: "cardRollIn",
    css: `
      @keyframes cardRollIn {
        from { transform: translateX(-100px) rotate(-120deg); opacity: 0; }
        to { transform: translateX(0) rotate(0deg); opacity: 1; }
      }
      .anim-cardRollIn {
        animation: cardRollIn 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Stagger In",
    key: "cardStaggerIn",
    css: `
      @keyframes cardStaggerIn {
        from { opacity: 0; transform: translateY(30px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .anim-cardStaggerIn {
        animation: cardStaggerIn 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },

  // Card Exit Animations
  {
    name: "Fade Out",
    key: "cardFadeOut",
    css: `
      @keyframes cardFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      .anim-cardFadeOut {
        animation: cardFadeOut 0.7s ease both;
      }
    `
  },
  {
    name: "Slide Out",
    key: "cardSlideOut",
    css: `
      @keyframes cardSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(60px); opacity: 0; }
      }
      .anim-cardSlideOut {
        animation: cardSlideOut 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Pop Out",
    key: "cardPopOut",
    css: `
      @keyframes cardPopOut {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0.5); opacity: 0; }
      }
      .anim-cardPopOut {
        animation: cardPopOut 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Zoom Out",
    key: "cardZoomOut",
    css: `
      @keyframes cardZoomOut {
        from { transform: scale(1); opacity: 1; }
        to { transform: scale(0.7); opacity: 0; }
      }
      .anim-cardZoomOut {
        animation: cardZoomOut 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Shrink Out",
    key: "cardShrinkOut",
    css: `
      @keyframes cardShrinkOut {
        from { transform: scaleY(1); opacity: 1; }
        to { transform: scaleY(0.2); opacity: 0; }
      }
      .anim-cardShrinkOut {
        animation: cardShrinkOut 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Roll Out",
    key: "cardRollOut",
    css: `
      @keyframes cardRollOut {
        from { transform: translateX(0) rotate(0deg); opacity: 1; }
        to { transform: translateX(100px) rotate(120deg); opacity: 0; }
      }
      .anim-cardRollOut {
        animation: cardRollOut 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Fly Out Left",
    key: "cardFlyOutLeft",
    css: `
      @keyframes cardFlyOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-120px) rotate(-10deg); opacity: 0; }
      }
      .anim-cardFlyOutLeft {
        animation: cardFlyOutLeft 0.6s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Fly Out Right",
    key: "cardFlyOutRight",
    css: `
      @keyframes cardFlyOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(120px) rotate(10deg); opacity: 0; }
      }
      .anim-cardFlyOutRight {
        animation: cardFlyOutRight 0.6s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Swipe Away",
    key: "cardSwipeAway",
    css: `
      @keyframes cardSwipeAway {
        from { transform: translateX(0) scale(1); opacity: 1; }
        to { transform: translateX(200px) scale(0.7); opacity: 0; }
      }
      .anim-cardSwipeAway {
        animation: cardSwipeAway 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },

  // Card Flip Animations
  {
    name: "Flip X",
    key: "cardFlipX",
    css: `
      @keyframes cardFlipX {
        from { transform: perspective(400px) rotateX(0deg);}
        to { transform: perspective(400px) rotateX(180deg);}
      }
      .anim-cardFlipX {
        animation: cardFlipX 0.7s cubic-bezier(.36,.07,.19,.97) both;
        backface-visibility: hidden;
      }
    `
  },
  {
    name: "Flip Y",
    key: "cardFlipY",
    css: `
      @keyframes cardFlipY {
        from { transform: perspective(400px) rotateY(0deg);}
        to { transform: perspective(400px) rotateY(180deg);}
      }
      .anim-cardFlipY {
        animation: cardFlipY 0.7s cubic-bezier(.36,.07,.19,.97) both;
        backface-visibility: hidden;
      }
    `
  },
  {
    name: "Flip In",
    key: "cardFlipIn",
    css: `
      @keyframes cardFlipIn {
        from { transform: perspective(400px) rotateY(90deg); opacity: 0;}
        to { transform: perspective(400px) rotateY(0deg); opacity: 1;}
      }
      .anim-cardFlipIn {
        animation: cardFlipIn 0.7s cubic-bezier(.36,.07,.19,.97) both;
        backface-visibility: hidden;
      }
    `
  },
  {
    name: "Flip Out",
    key: "cardFlipOut",
    css: `
      @keyframes cardFlipOut {
        from { transform: perspective(400px) rotateY(0deg); opacity: 1;}
        to { transform: perspective(400px) rotateY(-90deg); opacity: 0;}
      }
      .anim-cardFlipOut {
        animation: cardFlipOut 0.7s cubic-bezier(.36,.07,.19,.97) both;
        backface-visibility: hidden;
      }
    `
  },
  {
    name: "Reverse Flip",
    key: "cardReverseFlip",
    css: `
      @keyframes cardReverseFlip {
        from { transform: perspective(400px) rotateY(180deg);}
        to { transform: perspective(400px) rotateY(0deg);}
      }
      .anim-cardReverseFlip {
        animation: cardReverseFlip 0.7s cubic-bezier(.36,.07,.19,.97) both;
        backface-visibility: hidden;
      }
    `
  },

  // Card Movement Animations
  {
    name: "Hover Lift",
    key: "cardHoverLift",
    css: `
      .anim-cardHoverLift:hover {
        transform: translateY(-12px) scale(1.05);
        box-shadow: 0 8px 32px #00f2fe88;
        transition: transform 0.3s, box-shadow 0.3s;
      }
    `
  },
  {
    name: "Hover Tilt",
    key: "cardHoverTilt",
    css: `
      .anim-cardHoverTilt:hover {
        transform: rotate(-6deg) scale(1.03);
        transition: transform 0.3s;
      }
    `
  },
  {
    name: "Lift Up",
    key: "cardLiftUp",
    css: `
      @keyframes cardLiftUp {
        from { transform: translateY(0);}
        to { transform: translateY(-20px);}
      }
      .anim-cardLiftUp {
        animation: cardLiftUp 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Float",
    key: "cardFloat",
    css: `
      @keyframes cardFloat {
        0%, 100% { transform: translateY(0);}
        50% { transform: translateY(-10px);}
      }
      .anim-cardFloat {
        animation: cardFloat 1.2s ease-in-out both infinite;
      }
    `
  },
  {
    name: "Pulse",
    key: "cardPulse",
    css: `
      @keyframes cardPulse {
        0%, 100% { transform: scale(1);}
        50% { transform: scale(1.08);}
      }
      .anim-cardPulse {
        animation: cardPulse 0.8s ease-in-out both infinite;
      }
    `
  },
  {
    name: "Wiggle",
    key: "cardWiggle",
    css: `
      @keyframes cardWiggle {
        0%, 100% { transform: rotate(-2deg);}
        50% { transform: rotate(2deg);}
      }
      .anim-cardWiggle {
        animation: cardWiggle 0.4s ease-in-out both infinite;
      }
    `
  },
  {
    name: "Shake",
    key: "cardShake",
    css: `
      @keyframes cardShake {
        0%, 100% { transform: translateX(0);}
        20%, 60% { transform: translateX(-8px);}
        40%, 80% { transform: translateX(8px);}
      }
      .anim-cardShake {
        animation: cardShake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Rotate Slight",
    key: "cardRotateSlight",
    css: `
      @keyframes cardRotateSlight {
        from { transform: rotate(0deg);}
        to { transform: rotate(8deg);}
      }
      .anim-cardRotateSlight {
        animation: cardRotateSlight 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `
  },
  {
    name: "Swing",
    key: "cardSwing",
    css: `
      @keyframes cardSwing {
        20% { transform: rotate(15deg);}
        40% { transform: rotate(-10deg);}
        60% { transform: rotate(5deg);}
        80% { transform: rotate(-5deg);}
        100% { transform: rotate(0deg);}
      }
      .anim-cardSwing {
        animation: cardSwing 1s ease both;
      }
    `
  }
];