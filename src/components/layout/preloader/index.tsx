import PCancelable from 'p-cancelable';
import {
    FC, useEffect, useRef, useState,
} from 'react';
import { ProgressPreloader, utils } from 'vevet';
import styles from './styles.module.scss';



let preloader: ProgressPreloader | undefined;
export function getPreloader () {
    return preloader;
}

export function onPreloaderReady () {
    return new PCancelable<void>((
        resolve, reject,
    ) => {
        if (preloader) {
            setTimeout(() => {
                resolve();
            }, 200);
        } else {
            setTimeout(() => {
                onPreloaderReady().then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }, 100);
        }
    });
}



const LayoutPreloader: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState('00');

    useEffect(() => {
        if (!ref.current) {
            return () => {};
        }
        const container = ref.current;

        // reset styles
        container.style.backgroundColor = '';
        container.style.transition = '';
        container.style.opacity = '';
        container.style.visibility = '';
        container.style.display = '';

        const mod = new ProgressPreloader({
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
        mod.addCallback('progress', (data) => {
            const percent = utils.math.boundVal(data.progress * 100, [0, 99]);
            setProgress((percent).toFixed(0));
        });

        preloader = mod;

        return () => {
            mod.destroy();
        };
    }, [ref]);

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
