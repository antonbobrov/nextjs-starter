import { FC } from 'react';
import styles from './styles.module.scss';

const LayoutSmoothScroll: FC = ({
    children,
}) => (
    <div
        className={`${styles.smooth_scroll} v-smooth-scroll`}
        id="smooth-scroll"
    >
        <div className="v-smooth-scroll__container">
            {children}
        </div>
    </div>
);

export default LayoutSmoothScroll;
