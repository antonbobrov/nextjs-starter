import {
    FC, useEffect, useRef, useState,
} from 'react';
import { ProgressPreloader, utils } from 'vevet';
import styles from './styles.module.scss';

let preloader: ProgressPreloader | undefined;
export function getPreloader () {
    return preloader;
}

const Preloader: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState('00');

    useEffect(() => {
        if (ref.current) {
            const mod = new ProgressPreloader({
                container: ref.current,
                hide: 350,
                loaders: {
                    video: false,
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
        }
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

export default Preloader;