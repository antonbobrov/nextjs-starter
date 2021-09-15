import Router from 'next/router';
import { getAppPage } from './app';

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
    window.addEventListener('popstate', (e) => {
        readyToReload().then(() => {
            router.onPopState(e);
        }).catch(() => {});
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
            pushFunc(...arg).then((param) => {
                resolve(param);
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
        resolve();
    });
}
