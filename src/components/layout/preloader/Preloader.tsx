import { useEffect, useRef } from 'react';
import { Preloader as VevetPreloader } from 'vevet';
import app from '../../../app';
import styles from './Preloader.module.scss';

let preloader: VevetPreloader | undefined;
export function getPreloader () {
    return preloader;
}

const Preloader = () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            const mod = new VevetPreloader({
                container: ref.current,
                hide: 350,
            });
            preloader = mod;
            // show the page on preloader is to be hidden
            mod.addCallback('loaded', () => {
                if (!!app && !!app.page) {
                    app.page.show();
                }
            });
        }
    }, [ref]);

    return (
        <div className={styles.preloader} ref={ref} />
    );
};

export default Preloader;
