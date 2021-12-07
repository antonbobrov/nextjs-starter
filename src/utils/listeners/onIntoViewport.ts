import { GeneralTypes } from 'vevet';
import app from 'src/app';
import onPageScroll from './onPageScroll';

const intersectionObserverSupported = typeof window !== 'undefined' ? ('IntersectionObserver' in window) : false;

export default function onIntoViewport (
    element: Element,
    inCallback: () => void,
    outCallback: () => void,
): GeneralTypes.IRemovable {
    let isDestroyed = false;
    const pageEvent = app.onPageCreated();
    let scrollEvent: GeneralTypes.IRemovable | undefined;
    let observer: IntersectionObserver | undefined;

    let state: 'in' | 'out' | undefined;

    pageEvent.then(() => {
        if (isDestroyed) {
            return;
        }
        if (!intersectionObserverSupported) {
            // set scroll event
            scrollEvent = onPageScroll(() => {
                handleScroll();
            });
        } else {
            // set intersection events
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.001,
            };
            observer = new IntersectionObserver((entries) => {
                handleObserver(entries);
            }, options);
            observer.observe(element);
        }
    });

    function handleScroll () {
        const bounding = element.getBoundingClientRect();
        const { width, height } = app.viewport;
        if (
            bounding.bottom <= 0
            || bounding.right <= 0
            || bounding.top >= height
            || bounding.left >= width
        ) {
            if (state !== 'out') {
                state = 'out';
                outCallback();
            }
        } else if (state !== 'in') {
            state = 'in';
            inCallback();
        }
    }

    function handleObserver (
        entries: IntersectionObserverEntry[],
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (state !== 'in') {
                    state = 'in';
                    inCallback();
                }
            } else if (state !== 'out') {
                state = 'out';
                outCallback();
            }
        });
    }

    return {
        remove: () => {
            isDestroyed = true;
            pageEvent.cancel();
            if (scrollEvent) {
                scrollEvent.remove();
            }
            if (observer) {
                observer.disconnect();
            }
        },
    };
}

