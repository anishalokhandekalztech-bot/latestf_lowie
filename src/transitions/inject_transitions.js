import { transitionsList } from './list_transitions';

export function injectTransitions() {
  if (document.getElementById('dynamic-transitions')) return;
  const style = document.createElement('style');
  style.id = 'dynamic-transitions';
  style.innerHTML = transitionsList.map(e => e.css).join('\n');
  document.head.appendChild(style);
}