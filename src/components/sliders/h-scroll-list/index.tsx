import { FC, useEffect, useRef } from 'react';
import {
    CustomCursor,
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
    /**
     * @default false
     */
    useDragCursor?: boolean;
}

const SliderHScrollList: FC<Props> = ({
    children,
    useScrollbar = true,
    useKeyboard = true,
    useDrag = true,
    useDragCursor = false,
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
                speed: app.isMobile ? 2 : 1,
                stopPropagation: !app.isMobile ? undefined : {
                    dir: 'x',
                    threshold: 5,
                },
            }));
        }

        // add keyboard
        if (useKeyboard) {
            scroll.addPlugin(new SmoothScrollKeyboardPlugin());
        }

        // add custom cursor
        let cursor: CustomCursor | undefined;
        if (!app.isMobile && useDragCursor) {
            cursor = new CustomCursor({
                container: parentRef.current,
            });
            toggleCursor();
            scroll.addCallback('resize', () => {
                toggleCursor();
            });
        }
        function toggleCursor () {
            const allowCursor = scroll.maxScrollableHeight > 0 || scroll.maxScrollableWidth > 0;
            if (cursor) {
                if (allowCursor) {
                    cursor.enable();
                } else {
                    cursor.disable();
                }
            }
        }

        // destroy the scene
        return () => {
            scrollbar?.destroy();
            scroll.destroy();
            cursor?.destroy();
        };
    }, [parentRef, useScrollbar, useDrag, useKeyboard, useDragCursor]);

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
