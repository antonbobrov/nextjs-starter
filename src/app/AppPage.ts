import { Page, ScrollView, SmoothScroll } from 'vevet';
import { getPreloader } from '../components/layout/preloader/Preloader';

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
     * Create the page
     */
    protected _create () {
        super._create();
        const preloader = getPreloader();
        if (preloader) {
            preloader.onHide(() => {
                this.show();
            });
        }
    }



    /**
     * Show the page
     */
    protected _show () {
        super._show();
        this._createScrollView();
    }

    /**
     * Create ScrollView component
     */
    protected _createScrollView () {
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
