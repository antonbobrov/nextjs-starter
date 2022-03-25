import { FC, useEffect, useRef } from 'react';
import {
    ScrollBar, SmoothScroll, SmoothScrollDragPlugin, SmoothScrollKeyboardPlugin,
} from 'vevet';
import app from 'src/app';
import styles from './styles.module.scss';

interface Props {
    /**
     * @default true
     */
    useScrollbar?: boolean;
    /**
     * @default true
     */
    useKeyboard?: boolean;
    /**
     * @default true
     */
    useDrag?: boolean;
}

const SliderHScrollList: FC<Props> = ({
    children,
    useScrollbar = true,
    useKeyboard = true,
    useDrag = true,
}) => {
    const parentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!parentRef.current) {
            return undefined;
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
        let scrollbar: ScrollBar | undefined;
        if (useScrollbar) {
            scrollbar = new ScrollBar({
                container: scroll,
            });
        }

        // add dragger
        if (useDrag) {
            scroll.addPlugin(new SmoothScrollDragPlugin({
                speed: app.isMobile ? 1.5 : 1,
                stopPropagation: {
                    dir: 'x',
                    threshold: 5,
                },
            }));
        }

        // add keyboard
        if (useKeyboard) {
            scroll.addPlugin(new SmoothScrollKeyboardPlugin());
        }

        // destroy the scene
        return () => {
            scrollbar?.destroy();
            scroll.destroy();
        };
    }, [parentRef, useScrollbar, useDrag, useKeyboard]);

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
