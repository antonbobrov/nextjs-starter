import Router from 'next/router';
import { Callbacks, NCallbacks } from 'vevet';
import { getAppPage, isBrowser } from './app';
import store from './store/store';

interface CallbackTypes extends NCallbacks.CallbacksTypes {
    before: false;
    after: false;
}

/**
 * Callback on router change
 */
const routerCallbacks = (
    isBrowser ? new Callbacks<CallbackTypes>() : undefined
) as Callbacks<CallbackTypes>;
export default routerCallbacks;



override();

function override () {
    if (typeof window === 'undefined') {
        return;
    }

    // catch router
    const { router } = Router;
    if (!router) {
        setTimeout(() => {
            override();
        }, 30);
        return;
    }

    /**
     * Override .onPopState() listener
     */
    window.removeEventListener('popstate', router.onPopState);
    window.addEventListener('popstate', () => {
        router.push(window.location.href, window.location.href);
    });

    /**
     * Override .push()
     */
    const pushFunc = router.push.bind(router);
    router.push = (
        ...arg: Parameters<typeof pushFunc>
    ) => new Promise<boolean>((
        resolve, reject,
    ) => {
        readyToReload().then(() => {
            routerCallbacks.tbt('before', false);
            pushFunc(...arg).then((param) => {
                resolve(param);
                routerCallbacks.tbt('after', false);
            }).catch((param) => {
                reject(param);
            });
        }).catch(() => {
            reject();
        });
    });

    /**
     * Override .replace()
     */
    const replaceFunc = router.replace.bind(router);
    router.replace = (
        ...arg: Parameters<typeof replaceFunc>
    ) => new Promise<boolean>((
        resolve, reject,
    ) => {
        readyToReload().then(() => {
            replaceFunc(...arg).then((param) => {
                resolve(param);
            }).catch((param) => {
                reject(param);
            });
        }).catch(() => {
            reject();
        });
    });
}



/**
 * When the current page is destroyed and
 * the router is ready to update the state
 */
function readyToReload () {
    return new Promise<void>((
        resolve, reject,
    ) => {
        const page = getAppPage();
        // some actions if page exists
        if (page) {
            // hide the page if it is shown
            if (page.shown) {
                store.dispatch({
                    type: 'START_LOADING',
                });
                store.dispatch({
                    type: 'FIRST_PAGE_LOAD_DONE',
                });
                page.hide().then(() => {
                    // destroy the page
                    page.destroy().then(() => {
                        resolve();
                    }).catch(() => {
                        resolve();
                    });
                }).catch(() => {
                    resolve();
                });
                return;
            }
            // reject when the page is not shown
            reject();
            return;
        }
        // change the route if no page
        store.dispatch({
            type: 'START_LOADING',
        });
        store.dispatch({
            type: 'FIRST_PAGE_LOAD_DONE',
        });
        resolve();
    });
}
