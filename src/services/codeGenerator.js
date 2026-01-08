import { animationList } from '../animations/animationList';
import { hoverEffectsList } from '../hover_effects/list_hover_effects';
import { transitionsList } from '../transitions/list_transitions';

/**
 * Generate HTML and CSS code for a selected card with animations
 * @param {Object} card - The card object
 * @param {Object} cardStyle - The base card styling
 * @returns {Object} { html, css, fullCode }
 */
export const generateCardCode = (card, cardStyle = {}) => {
  if (!card) return { html: '', css: '', fullCode: '' };

  // Extract animation CSS
  let animationCss = '';
  if (card.animation) {
    const animationDef = animationList.find(anim => anim.key === card.animation);
    if (animationDef) {
      animationCss = animationDef.css;
    }
  }

  // Extract hover effect CSS
  let hoverCss = '';
  if (card.hoverEffect) {
    const hoverDef = hoverEffectsList.find(hover => hover.key === card.hoverEffect);
    if (hoverDef) {
      hoverCss = hoverDef.css;
    }
  }

  // Extract transition CSS
  let transitionCss = '';
  if (card.transition) {
    const transitionDef = transitionsList.find(trans => trans.key === card.transition);
    if (transitionDef) {
      transitionCss = transitionDef.css;
    }
  }

  // Merge styles
  const mergedStyle = {
    ...cardStyle,
    ...card.styleOverrides,
  };

  // Generate CSS string for the card
  const cardCssProperties = Object.entries(mergedStyle)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${kebabKey}: ${value};`;
    })
    .join('\n');

  // Generate class list
  const classList = [
    'card',
    card.animation ? `anim-${card.animation}` : '',
    card.hoverEffect ? `hover-${card.hoverEffect}` : '',
    card.transition && card.transitionActive ? `trans-${card.transition}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Generate HTML
  let htmlContent = '';
  if (card.imageData) {
    htmlContent = `
    ${card.imageData ? `<img src="${card.imageData}" alt="card-image" style="max-width: 80%; max-height: 60%; object-fit: cover; border-radius: 4px; margin-bottom: 4px;" />` : ''}
    ${card.textItems?.map((text, idx) => `<p style="margin: 0; line-height: 1.2; word-break: break-word;">${text}</p>`).join('\n    ')}
  `;
  } else {
    htmlContent = card.textItems?.length > 0
      ? card.textItems.map((text, idx) => `    <p style="margin: 0; line-height: 1.2; word-break: break-word;">${text}</p>`).join('\n')
      : `    <span>${card.label || 'Card'}</span>`;
  }

  const html = `<div class="${classList}">
${htmlContent}
</div>`;

  const css = `/* Card Styles */
.card {
${cardCssProperties}
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

${animationCss}

${hoverCss}

${transitionCss}`;

  const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Component - ${card.label || 'Card'}</title>
  <style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

  return {
    html,
    css,
    fullCode,
  };
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};
