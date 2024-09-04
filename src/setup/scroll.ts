import { isBrowser } from '@anton.bobrov/react-hooks';

if (isBrowser) {
  window.history.scrollRestoration = 'manual';
}
