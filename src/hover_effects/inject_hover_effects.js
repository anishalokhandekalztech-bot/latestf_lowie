import { hoverEffectsList } from './list_hover_effects';

export function injectHoverEffects() {
  if (document.getElementById('dynamic-hover-effects')) return;
  const style = document.createElement('style');
  style.id = 'dynamic-hover-effects';
  style.innerHTML = hoverEffectsList.map(e => e.css).join('\n');
  document.head.appendChild(style);
}