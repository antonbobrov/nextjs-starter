import { SmoothScroll, Timeline, utils } from 'vevet';
import { selectOne } from 'vevet-dom';
import { getAppPage } from 'src/app';



/**
 * Get current scroll selector
 */
export function getScrollSelector () {
    const page = getAppPage();
    if (page) {
        // get scroll selector
        if (page.smoothScroll) {
            return page.smoothScroll;
        }
        return window;
    }
    return undefined;
}

/**
 * Get current scroll values
 */
export function getScrollValues (
    selector: (Window | Element | SmoothScroll | undefined) = getScrollSelector(),
) {
    if (selector) {
        const scrollTop = selector instanceof Window
            ? selector.pageYOffset : selector.scrollTop;
        const scrollLeft = selector instanceof Window
            ? selector.pageXOffset : selector.scrollLeft;
        return {
            scrollTop,
            scrollLeft,
        };
    }
    return undefined;
}



interface ScrollToData {
    container?: Window | Element | SmoothScroll;
    top?: number;
    left?: number;
    duration?: number;
}

/**
 * Scroll to coordinates
 */
export function scrollTo ({
    container,
    top = 0,
    left = 0,
    duration = 250,
}: ScrollToData) {
    return new Promise<void>((
        resolve, reject,
    ) => {
        // save start values
        const scrollContainer = container || getScrollSelector();
        const startValues = getScrollValues(scrollContainer);
        if (startValues) {
            // create animation
            const timeline = new Timeline({
                duration,
            });
            timeline.addCallback('progress', (data) => {
                if (scrollContainer) {
                    scrollContainer.scrollTo({
                        top: startValues.scrollTop
                            + (top - startValues.scrollTop) * data.easing,
                        left: startValues.scrollLeft
                            + (left - startValues.scrollLeft) * data.easing,
                        behavior: 'auto',
                    });
                }
            });
            timeline.addCallback('end', () => {
                resolve();
            });
            timeline.play();
            return;
        }
        reject();
    });
}



interface ScrollToElement {
    container?: Window | Element | SmoothScroll;
    el: Element | string;
    top?: number;
    left?: number;
    duration?: number;
}

/**
 * Scroll to element
 */
export function scrollToElement ({
    container,
    el,
    top = 0,
    left = 0,
    duration = 250,
}: ScrollToElement) {
    return new Promise<void>((
        resolve, reject,
    ) => {
        const startValues = getScrollValues();
        if (startValues) {
            const element = selectOne(el);
            if (element) {
                const bounding = element.getBoundingClientRect();
                const toTop = utils.math.boundVal(
                    bounding.top + startValues.scrollTop - top,
                    [0, Infinity],
                );
                const toLeft = utils.math.boundVal(
                    bounding.left + startValues.scrollLeft - left,
                    [0, Infinity],
                );
                scrollTo({
                    container,
                    top: toTop,
                    left: toLeft,
                    duration,
                }).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }
            return;
        }
        reject();
    });
}
