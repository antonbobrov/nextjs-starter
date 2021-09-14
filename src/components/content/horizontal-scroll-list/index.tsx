import { useEffect, useRef } from 'react';
import { ScrollBar, SmoothScroll, SmoothScrollDragPlugin } from 'vevet';
import styles from './styles.module.scss';

interface Data {
    children: JSX.Element;
}

const HorizontalScrollList = ({
    children,
}: Data) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!ref.current) {
            return () => {};
        }
        // create scroll list
        const scroll = new SmoothScroll({
            selectors: {
                outer: ref.current,
            },
            isHorizontal: true,
            overscroll: false,
            useWheel: false,
        });
        // add scroll bar
        const scrollbar = new ScrollBar({
            container: scroll,
        });
        // add dragger
        scroll.addPlugin(new SmoothScrollDragPlugin());
        // destroy the scene
        return () => {
            scrollbar.destroy();
            scroll.destroy();
        };
    }, [ref]);

    return (
        <div className={`${styles.container} v-smooth-scroll`} ref={ref}>
            <div className="v-smooth-scroll__container">
                {children}
            </div>
        </div>
    );
};

export default HorizontalScrollList;
