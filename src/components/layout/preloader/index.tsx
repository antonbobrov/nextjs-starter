import store from '@/store/store';
import {
    FC, useEffect, useRef, useState,
} from 'react';
import { ProgressPreloader, utils } from 'vevet';
import styles from './styles.module.scss';

const LayoutPreloader: FC = () => {
    const [isDone, setIsDone] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState('00');

    useEffect(() => {
        if (isDone || !ref.current) {
            return () => {};
        }
        const container = ref.current;

        // reset styles
        container.style.backgroundColor = '';
        container.style.transition = '';
        container.style.opacity = '';
        container.style.visibility = '';
        container.style.display = '';

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
            const percent = utils.math.boundVal(data.progress * 100, [0, 99]);
            setProgress((percent).toFixed(0));
        });
        preloader.addCallback('loaded', () => {
            store.dispatch({
                type: 'SET_PRELOADER_DONE',
            });
            setIsDone(true);
        });

        return () => {
            preloader.destroy();
        };
    }, [ref, isDone]);

    return (
        <div className={`${styles.container} v-preloader`} ref={ref}>
            <span>
                {progress}
                %
            </span>
        </div>
    );
};

export default LayoutPreloader;
