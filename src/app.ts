import { Application } from 'vevet';
import AppPage from './app/AppPage';
import isBrowser from './utils/browser/isBrowser';

const app = isBrowser ? new Application<AppPage>() : false;
export default app;

// Scroll Settings
const useSmoothScroll = !(!!app && app.isMobile);
const useWindowScroll = !useSmoothScroll;
export const appSettings = {
    useSmoothScroll,
    useWindowScroll,
    useAdaptiveFontSize: true,
};
// set scroll classes
if (app) {
    if (useWindowScroll) {
        app.html.classList.add('use-native-scroll');
    } else if (useSmoothScroll) {
        app.html.classList.add('use-smooth-scroll');
    }
}
// disable scroll restoration
if (isBrowser) {
    window.history.scrollRestoration = 'manual';
}
// scroll to top on resize (mobile bug)
// when using custom scroll
if (!!app && !useWindowScroll) {
    app.viewport.add('', () => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, {
        timeout: 650,
        name: 'iOS scroll resize bug',
    });
}

// custom cursor
export const useCustomCursor = !!app && !app.isMobile;
