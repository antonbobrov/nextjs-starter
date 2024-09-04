import { isBrowser } from '@anton.bobrov/react-hooks';

function getMediaQuery() {
  return window.matchMedia('(prefers-reduced-motion: reduce)');
}

export const hasReduceMotion = isBrowser ? getMediaQuery().matches : false;

if (isBrowser) {
  getMediaQuery().addEventListener('change', () => {
    window.location.reload();
  });
}
