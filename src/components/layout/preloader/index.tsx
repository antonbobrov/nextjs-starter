import store from '@/store/store';
import {
    useEffect, useRef, useState, VFC,
} from 'react';
import { ProgressPreloader, utils } from 'vevet';
import styles from './styles.module.scss';

const LayoutPreloader: VFC = () => {
    const [isDone, setIsDone] = useState(false);

    const parentRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState('00');

    useEffect(() => {
        const container = parentRef.current;
        if (isDone || !container) {
            return () => {};
        }

        // reset styles
        container.style.backgroundColor = '';
        container.style.transition = '';
        container.style.opacity = '';
        container.style.visibility = '';
        container.style.display = '';

        // create preloader
        const preloader = new ProgressPreloader({
            container,
            hide: 350,
            loaders: {
                img: true,
                video: true,
                custom: '.js-preload-global',
            },
            calc: {
                lerp: 0.5,
                forceEnd: 250,
            },
        });
        preloader.addCallback('progress', (data) => {
            const percent = utils.math.clamp(data.progress * 100, [0, 99]);
            setProgress((percent).toFixed(0));
        });

        // set store events
        preloader.addCallback('loaded', () => {
            store.dispatch({
                type: 'SET_PRELOADER_HIDE',
            });
        });
        preloader.addCallback('hidden', () => {
            store.dispatch({
                type: 'SET_PRELOADER_DONE',
            });
            setIsDone(true);
        });

        const timeout = setTimeout(() => {
            store.dispatch({
                type: 'SET_PRELOADER_READY',
            });
        }, 500);

        return () => {
            preloader.destroy();
            clearTimeout(timeout);
        };
    }, [parentRef, isDone]);

    return (
        <div
            ref={parentRef}
            className={`${styles.container} v-preloader`}
        >
            <span>
                {progress}
                %
            </span>
        </div>
    );
};

export default LayoutPreloader;
