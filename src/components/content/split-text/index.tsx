import {
    FC, useEffect, useRef,
} from 'react';
import { SplitText as VevetSplitText } from 'vevet';
import styles from './styles.module.scss';

const SplitText: FC = ({
    children,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return () => { };
        }
        const text = new VevetSplitText({
            container: ref.current,
            appendLines: true,
        });
        return () => {
            text.destroy();
        };
    }, [ref]);

    return (
        <div
            ref={ref}
            className={styles.container}
        >
            {children}
        </div>
    );
};
export default SplitText;
