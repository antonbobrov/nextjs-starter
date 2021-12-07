import { useEffect } from 'react';
import app from 'src/app';
import { selectOne } from 'vevet-dom';
import Portal from '@/components/Portal';
import LayoutLoaderCurtainHandler from './Handler';
import styles from './styles.module.scss';

let handler: LayoutLoaderCurtainHandler | undefined;

/**
 * Show the loader curtain
 */
export function showLoaderCurtain () {
    return new Promise<void>((
        resolve, reject,
    ) => {
        if (handler) {
            handler.show().then(() => {
                resolve();
            });
        } else {
            reject();
        }
    });
}

/**
 * Hide the loader curtain
 */
export function hideLoaderCurtain () {
    return new Promise<void>((
        resolve, reject,
    ) => {
        if (handler) {
            handler.hide().then(() => {
                resolve();
            });
        } else {
            reject();
        }
    });
}

/**
 * Page loader curtain animation
 */
const LayoutLoaderCurtain = () => {
    useEffect(() => {
        const promise = app.onPageLoaded();
        promise.then(() => {
            const parent = selectOne('#loader-curtain');
            if (parent instanceof HTMLElement) {
                handler = new LayoutLoaderCurtainHandler(parent);
            }
            return () => {};
        });
        return () => {
            promise.cancel();
            handler?.destroy();
        };
    }, []);

    return (
        <Portal>
            <div
                id="loader-curtain"
                className={styles.layout_loader_curtain}
            />
        </Portal>
    );
};
export default LayoutLoaderCurtain;
