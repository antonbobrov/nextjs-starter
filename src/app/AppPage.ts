import { Page, ScrollView, SmoothScroll } from 'vevet';

export default class AppPage extends Page {
    // smooth scrolling
    protected _smoothScroll?: SmoothScroll;
    get smoothScroll () {
        return this._smoothScroll;
    }
    set smoothScroll (val: SmoothScroll | undefined) {
        this._smoothScroll = val;
    }

    // scroll view
    protected _scrollView?: ScrollView;
    get scrollView () {
        return this._scrollView;
    }



    /**
     * Show the page
     */
    protected _innerShow () {
        super._innerShow();
        // create ScrollView
        const container = this.smoothScroll ? this.smoothScroll : window;
        this._scrollView = new ScrollView({
            container,
            elements: '*[class*="v-view"]',
            useDelay: {
                max: 1000,
                dir: 'y',
            },
        });
    }
}
