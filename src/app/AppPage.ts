import {
    Page, ScrollBar, ScrollView, SmoothScroll, SmoothScrollKeyboardPlugin,
} from 'vevet';
import { selectOne } from 'vevet-dom';
import { getPreloader } from '../components/layout/preloader/Preloader';
import { appSettings } from '../app';
import { hideLoaderCurtain, showLoaderCurtain } from '../components/layout/loader-curtain/states';

export default class AppPage extends Page {
    // smooth scrolling
    protected _smoothScroll?: SmoothScroll;
    get smoothScroll () {
        return this._smoothScroll;
    }
    set smoothScroll (val: SmoothScroll | undefined) {
        this._smoothScroll = val;
    }

    // scroll bar
    protected _scrollBar?: ScrollBar;
    get scrollBar () {
        return this._scrollBar;
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
                hideLoaderCurtain().then(() => {
                    this._createSmoothScroll();
                    this._createScrollBar();
                    this._createScrollView();
                    resolve();
                });
            });
        });
    }

    /**
     * Create SmoothScroll
     */
    protected _createSmoothScroll () {
        if (!appSettings.useSmoothScroll) {
            return;
        }
        const container = selectOne('#smooth-scroll') as HTMLElement;
        if (!container) {
            return;
        }
        // create smooth scroll
        this._smoothScroll = new SmoothScroll({
            parent: this,
            enabled: true,
            selectors: {
                outer: container,
            },
            overscroll: false,
        });
        // add keyboard controls
        this._smoothScroll.addPlugin(new SmoothScrollKeyboardPlugin());
    }

    /**
     * Create page scrollbar
     */
    protected _createScrollBar () {
        const container = this.smoothScroll || window;
        // add scrollbar
        this._scrollBar = new ScrollBar({
            parent: this,
            container,
            optimizeCalculations: true,
        });
    }

    /**
     * Create ScrollView
     */
    protected _createScrollView () {
        // create ScrollView
        const container = this.smoothScroll ? this.smoothScroll : window;
        this._scrollView = new ScrollView({
            parent: this,
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
            if (this.smoothScroll) {
                this.smoothScroll.changeProp({
                    enabled: false,
                });
            }
            showLoaderCurtain().then(() => {
                super._hide().then(() => {
                    resolve();
                });
            });
        });
    }
}
