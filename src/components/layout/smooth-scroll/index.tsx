import { FC } from 'react';

const LayoutSmoothScroll: FC = ({
    children,
}) => (
    <div
        className="v-smooth-scroll"
        id="smooth-scroll"
    >
        <div className="v-smooth-scroll__container">
            {children}
        </div>
    </div>
);

export default LayoutSmoothScroll;
