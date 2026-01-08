export const hoverEffectsList = [
  {
    name: "Glow",
    key: "glow",
    css: `
      .hover-glow:hover {
        box-shadow: 0 0 16px 4px #00f2fe, 0 0 32px 8px #4facfe;
        transition: box-shadow 0.3s;
      }
    `
  },
  {
    name: "Lift Up",
    key: "liftUp",
    css: `
      .hover-liftUp:hover {
        transform: translateY(-12px) scale(1.05);
        box-shadow: 0 8px 32px #00f2fe88;
        transition: transform 0.3s, box-shadow 0.3s;
      }
    `
  },
  {
    name: "Gradient Border",
    key: "gradientBorder",
    css: `
      .hover-gradientBorder {
        position: relative;
        z-index: 1;
      }
      .hover-gradientBorder::before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 12px;
        background: linear-gradient(90deg, #00f2fe, #4facfe, #00f2fe);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: -1;
      }
      .hover-gradientBorder:hover::before {
        opacity: 1;
      }
    `
  },
  {
    name: "Scale",
    key: "scale",
    css: `
      .hover-scale:hover {
        transform: scale(1.08);
        transition: transform 0.2s;
      }
    `
  },
  {
    name: "Shadow Pop",
    key: "shadowPop",
    css: `
      .hover-shadowPop:hover {
        box-shadow: 0 0 24px #00f2fe, 0 0 48px #4facfe;
        transform: scale(1.04);
        transition: box-shadow 0.3s, transform 0.3s;
      }
    `
  },
  {
    name: "Rotate",
    key: "rotate",
    css: `
      .hover-rotate:hover {
        transform: rotate(-8deg) scale(1.04);
        transition: transform 0.3s;
      }
    `
  },
  {
    name: "Pulse",
    key: "pulse",
    css: `
      @keyframes pulseHover {
        0% { box-shadow: 0 0 0px #00f2fe; }
        50% { box-shadow: 0 0 24px #00f2fe; }
        100% { box-shadow: 0 0 0px #00f2fe; }
      }
      .hover-pulse:hover {
        animation: pulseHover 0.8s infinite;
      }
    `
  },
  {
    name: "Flip",
    key: "flip",
    css: `
      .hover-flip {
        transition: transform 0.5s;
        transform-style: preserve-3d;
      }
      .hover-flip:hover {
        transform: rotateY(180deg);
      }
    `
  },
  {
    name: "Blur",
    key: "blur",
    css: `
      .hover-blur:hover {
        filter: blur(2px) brightness(1.2);
        transition: filter 0.3s;
      }
    `
  },
  {
    name: "Text Color Change",
    key: "textColorChange",
    css: `
      .hover-textColorChange:hover {
        color: #00f2fe;
        transition: color 0.3s;
      }
    `
  },
  {
    name: "Skew",
    key: "skew",
    css: `
      .hover-skew:hover {
        transform: skewX(5deg) skewY(5deg);
        transition: transform 0.3s;
      }
    `
  },
  {
    name: "Bounce",
    key: "bounce",
    css: `
      @keyframes bounceHover {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .hover-bounce:hover {
        animation: bounceHover 0.6s ease-in-out;
      }
    `
  },
  {
    name: "Neon Glow",
    key: "neonGlow",
    css: `
      .hover-neonGlow:hover {
        box-shadow: 0 0 10px #00f2fe, 0 0 20px #4facfe, 0 0 30px #00f2fe;
        text-shadow: 0 0 10px #00f2fe;
        transition: box-shadow 0.3s, text-shadow 0.3s;
      }
    `
  },
  {
    name: "Slide Left",
    key: "slideLeft",
    css: `
      .hover-slideLeft:hover {
        transform: translateX(-8px);
        box-shadow: -4px 0 12px #00f2fe44;
        transition: transform 0.3s, box-shadow 0.3s;
      }
    `
  },
  {
    name: "Slide Right",
    key: "slideRight",
    css: `
      .hover-slideRight:hover {
        transform: translateX(8px);
        box-shadow: 4px 0 12px #00f2fe44;
        transition: transform 0.3s, box-shadow 0.3s;
      }
    `
  },
  {
    name: "Slide Up",
    key: "slideUp",
    css: `
      .hover-slideUp:hover {
        transform: translateY(-8px);
        box-shadow: 0 -4px 12px #00f2fe44;
        transition: transform 0.3s, box-shadow 0.3s;
      }
    `
  },
  {
    name: "Slide Down",
    key: "slideDown",
    css: `
      .hover-slideDown:hover {
        transform: translateY(8px);
        box-shadow: 0 4px 12px #00f2fe44;
        transition: transform 0.3s, box-shadow 0.3s;
      }
    `
  },
  {
    name: "Color Shift",
    key: "colorShift",
    css: `
      .hover-colorShift:hover {
        background: linear-gradient(135deg, #00f2fe, #4facfe);
        transition: background 0.4s;
      }
    `
  },
  {
    name: "Underline Expand",
    key: "underlineExpand",
    css: `
      .hover-underlineExpand {
        position: relative;
      }
      .hover-underlineExpand::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: #00f2fe;
        transition: width 0.3s, left 0.3s;
      }
      .hover-underlineExpand:hover::after {
        left: 0;
        width: 100%;
      }
    `
  },
  {
    name: "Brightness Increase",
    key: "brightnessIncrease",
    css: `
      .hover-brightnessIncrease:hover {
        filter: brightness(1.3);
        transition: filter 0.3s;
      }
    `
  },
  {
    name: "Saturate",
    key: "saturate",
    css: `
      .hover-saturate:hover {
        filter: saturate(1.5);
        transition: filter 0.3s;
      }
    `
  },
  {
    name: "Invert Colors",
    key: "invertColors",
    css: `
      .hover-invertColors:hover {
        filter: invert(0.1);
        transition: filter 0.3s;
      }
    `
  },
  {
    name: "Sepia Tone",
    key: "sepiaTone",
    css: `
      .hover-sepiaTone:hover {
        filter: sepia(0.4);
        transition: filter 0.3s;
      }
    `
  },
  {
    name: "Scale X",
    key: "scaleX",
    css: `
      .hover-scaleX:hover {
        transform: scaleX(1.15);
        transition: transform 0.3s;
      }
    `
  },
  {
    name: "Scale Y",
    key: "scaleY",
    css: `
      .hover-scaleY:hover {
        transform: scaleY(1.15);
        transition: transform 0.3s;
      }
    `
  },
  {
    name: "Wobble",
    key: "wobble",
    css: `
      @keyframes wobbleHover {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-2deg); }
        75% { transform: rotate(2deg); }
      }
      .hover-wobble:hover {
        animation: wobbleHover 0.5s ease-in-out;
      }
    `
  },
  {
    name: "Swing",
    key: "swing",
    css: `
      @keyframes swingHover {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(8deg); }
        100% { transform: rotate(0deg); }
      }
      .hover-swing:hover {
        transform-origin: top center;
        animation: swingHover 0.6s ease-in-out;
      }
    `
  },
  {
    name: "Float",
    key: "float",
    css: `
      @keyframes floatHover {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      .hover-float:hover {
        animation: floatHover 0.8s ease-in-out infinite;
      }
    `
  },
  {
    name: "Expand Shadow",
    key: "expandShadow",
    css: `
      .hover-expandShadow:hover {
        box-shadow: 0 8px 16px #00f2fe33, 0 16px 32px #4facfe33;
        transition: box-shadow 0.4s;
      }
    `
  },
  {
    name: "Gradient Pulse",
    key: "gradientPulse",
    css: `
      @keyframes gradientPulseHover {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .hover-gradientPulse:hover {
        background: linear-gradient(90deg, #00f2fe, #4facfe, #00f2fe);
        background-size: 200% 200%;
        animation: gradientPulseHover 1.5s ease infinite;
      }
    `
  }
];