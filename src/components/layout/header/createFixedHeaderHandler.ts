import onPageScroll from '@/utils/listeners/onPageScroll';
import app from 'src/app';
import { GeneralTypes } from 'vevet';

const classNames = {
    show: 'show-fixed-header',
};

export interface IFixedHeaderHandler extends GeneralTypes.IDestroyable {
    show: () => void;
    hide: () => void;
    toggle: (val: boolean) => void;
}

export default function createFixedHeaderHandler (): IFixedHeaderHandler {
    // states
    let isShown = false;
    let prevTop = 0;

    // set scroll event
    const scrollEvent = onPageScroll(({
        scrollTop,
    }) => {
        const edge = app.viewport.height;
        // define if need to hide the fixed header
        if (scrollTop < edge) {
            hide();
        } else if (scrollTop >= prevTop) {
            hide();
        } else {
            show();
        }
        // update previous scroll value
        prevTop = scrollTop;
    }, {
        passive: true,
    });

    /**
     * Show the header
     */
    function show () {
        toggle(true);
    }

    /**
     * Hide the header
     */
    function hide () {
        toggle(false);
    }

    /**
     * Show / Hide the header
     */
    function toggle (
        val: boolean,
    ) {
        if (val && isShown) {
            return;
        }
        if (!val && !isShown) {
            return;
        }
        isShown = val;
        app.html.classList.toggle(classNames.show, val);
    }

    return {
        destroy: () => {
            scrollEvent.remove();
            hide();
        },
        show,
        toggle,
        hide,
    };
}
