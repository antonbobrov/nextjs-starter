import { Application } from 'vevet';
import type { GUI } from 'dat.gui';
import AppPage from './app/AppPage';
import registerServiceWorker from './service-worker';

registerServiceWorker();

export const isBrowser = typeof window !== 'undefined';
export const isServer = !isBrowser;

const app = (isBrowser ? new Application<AppPage>({
    viewportResizeTimeout: 100,
}) : undefined) as Application<AppPage>;
export default app;

// get current Vevet page
export function getAppPage () {
    return app ? app.page : false;
}

// testing state
export const isTesting = process.env.NODE_ENV === 'development';

// Scroll Settings
export const useSmoothScroll = !(!!app && (app.isMobile || app.osName === 'mac'));
export const useWindowScroll = !useSmoothScroll;

// font size settings
export const useAdaptiveFontSize = true;

// set scroll classes
if (app) {
    app.html.classList.toggle('use-native-scroll', useWindowScroll);
    app.html.classList.toggle('use-smooth-scroll', useSmoothScroll);
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

// dat.gui
export const gui = new Promise((
    resolve: (arg: GUI | undefined) => void,
) => {
    if (isBrowser) {
        if (app.isMobile || process.env.NEXT_PUBLIC_USE_GUI !== 'true') {
            resolve(undefined);
        } else {
            import('dat.gui').then((module) => {
                resolve(new module.GUI({
                    closed: true,
                }));
            }).catch(() => {});
        }
    } else {
        resolve(undefined);
    }
});
