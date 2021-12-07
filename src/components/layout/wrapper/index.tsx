import { forwardRef } from 'react';
import styles from './styles.module.scss';

const LayoutWrapper = forwardRef<HTMLDivElement, any>((
    props,
    ref,
) => (
    <div
        ref={ref}
        className={styles.layout_wrapper}
    >
        {props.children}
    </div>
));
LayoutWrapper.displayName = 'Layout wrapper';
export default LayoutWrapper;
