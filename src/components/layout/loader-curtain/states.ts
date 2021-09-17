import type LoaderCurtain from './LoaderCurtain';

let loader: LoaderCurtain;

function create () {
    return new Promise<void>((
        resolve,
    ) => {
        if (!loader) {
            import('./LoaderCurtain').then((mod) => {
                // eslint-disable-next-line new-cap
                loader = new mod.default();
                document.body.appendChild(loader);
                resolve();
            });
            return;
        }
        resolve();
    });
}

/**
 * Show the loader curtain
 */
export function showLoaderCurtain () {
    return new Promise<void>((
        resolve,
    ) => {
        create().then(() => {
            loader.show().then(() => {
                resolve();
            });
        });
    });
}

/**
 * Hide the loader curtain
 */
export function hideLoaderCurtain () {
    return new Promise<void>((
        resolve,
    ) => {
        if (!loader) {
            resolve();
        } else {
            loader.hide().then(() => {
                resolve();
            });
        }
    });
}
