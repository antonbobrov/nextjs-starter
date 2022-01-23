import { FC, useEffect, useRef } from 'react';
import {
    ScrollBar, SmoothScroll, SmoothScrollDragPlugin, SmoothScrollKeyboardPlugin,
} from 'vevet';
import app from 'src/app';
import styles from './styles.module.scss';

const SliderHScrollList: FC = ({
    children,
}) => {
    const parentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!parentRef.current) {
            return () => {};
        }

        // create scroll list
        const scroll = new SmoothScroll({
            selectors: {
                outer: parentRef.current,
            },
            isHorizontal: true,
            overscroll: false,
            useWheel: false,
            render: {
                lerp: app.isMobile ? 0.2 : 0.1,
            },
        });
        // add scroll bar
        const scrollbar = new ScrollBar({
            container: scroll,
        });
        // add dragger
        scroll.addPlugin(new SmoothScrollDragPlugin({
            speed: app.isMobile ? 1.5 : 1,
            stopPropagation: {
                dir: 'x',
                threshold: 5,
            },
        }));
        // add keyboard
        scroll.addPlugin(new SmoothScrollKeyboardPlugin());

        // destroy the scene
        return () => {
            scrollbar.destroy();
            scroll.destroy();
        };
    }, [parentRef]);

    return (
        <div
            ref={parentRef}
            className={`${styles.slider_h_scroll_list} v-smooth-scroll`}
        >
            <div className="v-smooth-scroll__container">
                {children}
            </div>
        </div>
    );
};

export default SliderHScrollList;
