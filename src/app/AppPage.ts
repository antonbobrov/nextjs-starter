import {
    Page, ScrollBar, ScrollView, SmoothScroll, SmoothScrollKeyboardPlugin,
} from 'vevet';
import { selectOne } from 'vevet-dom';
import { getPreloader } from '../components/layout/preloader';
import { appSettings } from '../app';
import { hideLoaderCurtain, showLoaderCurtain } from '../components/layout/loader-curtain/states';
import createFixedHeaderHandler, { IFixedHeaderHandler } from '../components/layout/header/createFixedHeaderHandler';
import pageIsLoading from '../store/pageIsLoading';

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

    // fixed header handler
    protected _fixedHeaderHandler?: IFixedHeaderHandler;



    /**
     * Create the page
     */
    protected _create () {
        return new Promise<void>((
            resolve,
        ) => {
            super._create().then(() => {
                this._createInner();
                resolve();
            });
        });
    }

    /**
     * Create the page
     */
    protected _createInner () {
        // create smooth scrolling
        this._createSmoothScroll();

        // process layout headers
        this._fixedHeaderHandler = createFixedHeaderHandler();
        this.addCallback('destroy', () => {
            if (this._fixedHeaderHandler) {
                this._fixedHeaderHandler.destroy();
                this._fixedHeaderHandler = undefined;
            }
        });

        // show the page on preloader hide
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
        return new Promise<void>((
            resolve,
        ) => {
            super._show().then(() => {
                hideLoaderCurtain().then(() => {
                    this._showInner();
                    resolve();
                });
            });
        });
    }

    /**
     * Show the page
     */
    protected _showInner () {
        pageIsLoading.end();

        this._createScrollBar();
        this._createScrollView();
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
