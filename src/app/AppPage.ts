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
        return new Promise<void>((
            resolve,
        ) => {
            super._create().then(() => {
                const preloader = getPreloader();
                if (preloader) {
                    preloader.onHide(() => {
                        this.show();
                    });
                }
                resolve();
            });
        });
    }



    /**
     * Show the page
     */
    protected _show () {
        return new Promise<void>((
            resolve,
        ) => {
            super._show().then(() => {
                this._createScrollView();
                resolve();
            });
        });
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



    /**
     * Hide the page
     */
    protected _hide () {
        return new Promise<void>((
            resolve,
        ) => {
            super._hide().then(() => {
                if (this.smoothScroll) {
                    this.smoothScroll.changeProp({
                        enabled: false,
                    });
                }
                resolve();
            });
        });
    }
}
