import { Application } from 'vevet';
import AppPage from './app/AppPage';
import isBrowser from './utils/browser/isBrowser';

const app = isBrowser ? new Application<AppPage>() : false;
export default app;

// App Settings
const useSmoothScroll = !(!!app && app.isMobile);
const useWindowScroll = !useSmoothScroll;
export const appSettings = {
    useSmoothScroll,
    useWindowScroll,
    useAdaptiveFontSize: true,
};

// fix scroll
if (appSettings.useWindowScroll && isBrowser) {
    window.history.scrollRestoration = 'manual';
}

// scroll to top on resize (mobile bug)
if (!!app && !useWindowScroll) {
    app.viewport.add('', () => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, {
        timeout: 650,
        name: 'iOS scroll resize bug',
    });
}

// set scroll classes
if (app) {
    if (useWindowScroll) {
        app.html.classList.add('use-native-scroll');
    } else if (useSmoothScroll) {
        app.html.classList.add('use-smooth-scroll');
    }
}
