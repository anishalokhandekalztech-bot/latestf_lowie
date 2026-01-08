import { animationList } from './animationList';

export function injectAnimations() {
  if (document.getElementById('dynamic-animations')) return;
  const style = document.createElement('style');
  style.id = 'dynamic-animations';
  style.innerHTML = animationList.map(a => a.css).join('\n');
  document.head.appendChild(style);
}