import {
    FC, useEffect, useRef,
} from 'react';
import { SplitText as VevetSplitText } from 'vevet';
import styles from './styles.module.scss';

const ExamplesSplitText: FC = ({
    children,
}) => {
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!parentRef.current) {
            return () => { };
        }
        const text = new VevetSplitText({
            container: parentRef.current,
            appendLines: true,
        });
        return () => {
            text.destroy();
        };
    }, [parentRef]);

    return (
        <div
            ref={parentRef}
            className={styles.split_text}
        >
            {children}
        </div>
    );
};
export default ExamplesSplitText;
