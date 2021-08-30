import { useEffect, useRef } from 'react';
import { ScrollBar, SmoothScroll } from 'vevet';
import app, { appSettings } from '../../../app';

interface Data {
    children: JSX.Element;
}

const LayoutSmoothScroll = ({
    children,
}: Data) => {
    // smooth scroll outer
    const outer = useRef<HTMLDivElement>(null);

    // create smooth scrolling
    useEffect(() => {
        // only if available
        if (!outer.current || !appSettings.useSmoothScroll) {
            return () => {};
        }

        // smooth scroll
        const scroll = new SmoothScroll({
            selectors: {
                outer: outer.current,
            },
            overscroll: false,
        });
        if (app) {
            app.onPageCreated().then((page) => {
                page.smoothScroll = scroll;
            });
        }

        // add scrollbar
        const scrollbar = new ScrollBar({
            container: scroll,
            optimizeCalculations: true,
        });

        return () => {
            scrollbar.destroy();
            scroll.destroy();
        };
    }, [outer]);

    return (
        <div
            className="v-smooth-scroll"
            ref={outer}
        >
            <div className="v-smooth-scroll__container">
                {children}
            </div>
        </div>
    );
};

export default LayoutSmoothScroll;
