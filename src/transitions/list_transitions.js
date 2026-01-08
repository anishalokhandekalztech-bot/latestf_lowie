export const transitionsList = [
  {
    name: "Mosaic Impacts",
    key: "mosaicImpacts",
    css: `
      .trans-mosaicImpacts {
        transition: filter 0.7s cubic-bezier(.36,.07,.19,.97);
      }
      .trans-mosaicImpacts.trans-active {
        filter: blur(4px) brightness(1.5);
      }
    `
  },
  {
    name: "Star Wipe Impacts",
    key: "starWipeImpacts",
    css: `
      .trans-starWipeImpacts {
        transition: clip-path 0.7s linear;
        clip-path: polygon(0 0, 0 0, 0 0, 0 0);
      }
      .trans-starWipeImpacts.trans-active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    `
  },
  {
    name: "Chaos Impacts",
    key: "chaosImpacts",
    css: `
      .trans-chaosImpacts {
        transition: transform 0.7s cubic-bezier(.36,.07,.19,.97);
      }
      .trans-chaosImpacts.trans-active {
        transform: rotate(-10deg) scale(1.1);
      }
    `
  },
  {
    name: "Burn Alpha Impacts",
    key: "burnAlphaImpacts",
    css: `
      .trans-burnAlphaImpacts {
        transition: opacity 0.7s, filter 0.7s;
      }
      .trans-burnAlphaImpacts.trans-active {
        opacity: 0.5;
        filter: brightness(2);
      }
    `
  },
  {
    name: "Flash Impacts",
    key: "flashImpacts",
    css: `
      .trans-flashImpacts {
        transition: opacity 0.4s;
      }
      .trans-flashImpacts.trans-active {
        opacity: 0;
      }
    `
  },
  {
    name: "Blur to Color Impacts",
    key: "blurToColorImpacts",
    css: `
      .trans-blurToColorImpacts {
        transition: filter 0.7s;
      }
      .trans-blurToColorImpacts.trans-active {
        filter: blur(6px) grayscale(1);
      }
    `
  },
  {
    name: "Roll Impacts",
    key: "rollImpacts",
    css: `
      .trans-rollImpacts {
        transition: transform 0.7s;
      }
      .trans-rollImpacts.trans-active {
        transform: rotateY(180deg);
      }
    `
  },
  {
    name: "Stretch Impacts",
    key: "stretchImpacts",
    css: `
      .trans-stretchImpacts {
        transition: transform 0.7s;
      }
      .trans-stretchImpacts.trans-active {
        transform: scaleX(1.3);
      }
    `
  },
  {
    name: "Dissolve Impacts",
    key: "dissolveImpacts",
    css: `
      .trans-dissolveImpacts {
        transition: opacity 0.7s;
      }
      .trans-dissolveImpacts.trans-active {
        opacity: 0.2;
      }
    `
  },
  {
    name: "Push Impacts",
    key: "pushImpacts",
    css: `
      .trans-pushImpacts {
        transition: transform 0.7s;
      }
      .trans-pushImpacts.trans-active {
        transform: translateX(40px);
      }
    `
  },
  {
    name: "Burn Chroma Impacts",
    key: "burnChromaImpacts",
    css: `
      .trans-burnChromaImpacts {
        transition: filter 0.7s;
      }
      .trans-burnChromaImpacts.trans-active {
        filter: brightness(2) sepia(1);
      }
    `
  },
  {
    name: "Blur Dissolve Impacts",
    key: "blurDissolveImpacts",
    css: `
      .trans-blurDissolveImpacts {
        transition: filter 0.7s, opacity 0.7s;
      }
      .trans-blurDissolveImpacts.trans-active {
        filter: blur(8px);
        opacity: 0.3;
      }
    `
  },
  {
    name: "Fade Impacts",
    key: "fadeImpacts",
    css: `
      .trans-fadeImpacts {
        transition: opacity 0.7s ease-in-out;
      }
      .trans-fadeImpacts.trans-active {
        opacity: 0;
      }
    `
  },
  {
    name: "Slide Left Impacts",
    key: "slideLeftImpacts",
    css: `
      .trans-slideLeftImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-slideLeftImpacts.trans-active {
        transform: translateX(-100%);
      }
    `
  },
  {
    name: "Slide Right Impacts",
    key: "slideRightImpacts",
    css: `
      .trans-slideRightImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-slideRightImpacts.trans-active {
        transform: translateX(100%);
      }
    `
  },
  {
    name: "Slide Up Impacts",
    key: "slideUpImpacts",
    css: `
      .trans-slideUpImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-slideUpImpacts.trans-active {
        transform: translateY(-100%);
      }
    `
  },
  {
    name: "Slide Down Impacts",
    key: "slideDownImpacts",
    css: `
      .trans-slideDownImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-slideDownImpacts.trans-active {
        transform: translateY(100%);
      }
    `
  },
  {
    name: "Zoom In Impacts",
    key: "zoomInImpacts",
    css: `
      .trans-zoomInImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-zoomInImpacts.trans-active {
        transform: scale(0);
      }
    `
  },
  {
    name: "Zoom Out Impacts",
    key: "zoomOutImpacts",
    css: `
      .trans-zoomOutImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-zoomOutImpacts.trans-active {
        transform: scale(1.5);
      }
    `
  },
  {
    name: "Rotate Impacts",
    key: "rotateImpacts",
    css: `
      .trans-rotateImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-rotateImpacts.trans-active {
        transform: rotate(360deg);
      }
    `
  },
  {
    name: "Flip Horizontal Impacts",
    key: "flipHorizontalImpacts",
    css: `
      .trans-flipHorizontalImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-flipHorizontalImpacts.trans-active {
        transform: rotateY(180deg);
      }
    `
  },
  {
    name: "Flip Vertical Impacts",
    key: "flipVerticalImpacts",
    css: `
      .trans-flipVerticalImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-flipVerticalImpacts.trans-active {
        transform: rotateX(180deg);
      }
    `
  },
  {
    name: "Saturation Impacts",
    key: "saturationImpacts",
    css: `
      .trans-saturationImpacts {
        transition: filter 0.7s ease-in-out;
      }
      .trans-saturationImpacts.trans-active {
        filter: saturate(0);
      }
    `
  },
  {
    name: "Hue Rotate Impacts",
    key: "hueRotateImpacts",
    css: `
      .trans-hueRotateImpacts {
        transition: filter 0.7s ease-in-out;
      }
      .trans-hueRotateImpacts.trans-active {
        filter: hue-rotate(180deg);
      }
    `
  },
  {
    name: "Contrast Impacts",
    key: "contrastImpacts",
    css: `
      .trans-contrastImpacts {
        transition: filter 0.7s ease-in-out;
      }
      .trans-contrastImpacts.trans-active {
        filter: contrast(0.2);
      }
    `
  },
  {
    name: "Color Shift Impacts",
    key: "colorShiftImpacts",
    css: `
      .trans-colorShiftImpacts {
        transition: background-color 0.7s ease-in-out;
      }
      .trans-colorShiftImpacts.trans-active {
        background-color: #00f2fe;
      }
    `
  },
  {
    name: "Skew Impacts",
    key: "skewImpacts",
    css: `
      .trans-skewImpacts {
        transition: transform 0.7s ease-in-out;
      }
      .trans-skewImpacts.trans-active {
        transform: skewX(20deg) skewY(10deg);
      }
    `
  },
  {
    name: "Warp Grid Impacts",
    key: "warpGridImpacts",
    css: `
      .trans-warpGridImpacts {
        transition: clip-path 0.7s ease-in-out;
      }
      .trans-warpGridImpacts.trans-active {
        clip-path: polygon(0 0, 100% 15%, 85% 100%, 0 85%);
      }
    `
  },
  {
    name: "Gradient Shift Impacts",
    key: "gradientShiftImpacts",
    css: `
      .trans-gradientShiftImpacts {
        background: linear-gradient(90deg, #1a1a1a, #1a1a1a);
        transition: background 0.7s ease-in-out;
      }
      .trans-gradientShiftImpacts.trans-active {
        background: linear-gradient(90deg, #00f2fe, #4facfe);
      }
    `
  },
  {
    name: "Drop Shadow Impacts",
    key: "dropShadowImpacts",
    css: `
      .trans-dropShadowImpacts {
        transition: filter 0.7s ease-in-out;
      }
      .trans-dropShadowImpacts.trans-active {
        filter: drop-shadow(0 10px 20px #00f2fe77);
      }
    `
  }
];