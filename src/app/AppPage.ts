import {
    Page, ProgressPreloader, ScrollBar, ScrollView,
    SmoothScroll, SmoothScrollDragPlugin, SmoothScrollKeyboardPlugin,
} from 'vevet';
import { selectOne } from 'vevet-dom';
import app, { useSmoothScroll } from 'src/app';
import store from '@/store/store';
import { hideLoaderCurtain, showLoaderCurtain } from '@/components/layout/loader-curtain';
import createFixedHeaderHandler, { IFixedHeaderHandler } from '@/components/layout/header/createFixedHeaderHandler';

export default class AppPage extends Page {
    // page preloader
    protected _pagePreloader?: ProgressPreloader;

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
        this._catchPreloaderDone().then(() => {
            this.onCreate().then(() => {
                this.show().catch(() => {
                    throw new Error('cant');
                });
            });
        });
    }

    protected _catchPreloaderDone () {
        return new Promise<void>((
            resolve,
        ) => {
            if (store.getState().layout.preloaderDone) {
                resolve();
            } else {
                const event = store.subscribe(() => {
                    if (store.getState().layout.preloaderDone) {
                        resolve();
                        event();
                    }
                });
            }
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
                const hasInnerPreloader = store.getState().layout.preloaderDone;
                if (hasInnerPreloader) {
                    this._onPageLoaded().then(() => {
                        this._showInner();
                        resolve();
                        if (!store.getState().page.firstLoad) {
                            hideLoaderCurtain();
                        }
                    });
                } else {
                    this._showInner();
                    resolve();
                    if (!store.getState().page.firstLoad) {
                        hideLoaderCurtain();
                    }
                }
            });
        });
    }

    /**
     * Show the page
     */
    protected _showInner () {
        store.dispatch({
            type: 'END_LOADING',
        });

        this._createScrollBar();
        this._createScrollView();
    }

    /**
     * Create a page preloader
     */
    protected _onPageLoaded () {
        return new Promise<void>((
            resolve,
        ) => {
            this._pagePreloader = new ProgressPreloader({
                parent: this,
                container: false,
                hide: false,
                loaders: {
                    img: false,
                    video: false,
                    custom: '.js-preload-inner',
                },
                calc: {
                    lerp: false,
                },
            });
            this._pagePreloader.addCallback('loaded', () => {
                resolve();
            });
        });
    }

    /**
     * Create SmoothScroll
     */
    protected _createSmoothScroll () {
        if (!useSmoothScroll) {
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
            useWillChange: !app.browserName.includes('firefox'),
        });
        // add keyboard controls
        this._smoothScroll.addPlugin(new SmoothScrollKeyboardPlugin());

        // add drag
        if (app.isMobile) {
            this._smoothScroll.addPlugin(new SmoothScrollDragPlugin({
                lerp: 0.35,
            }));
        }
    }

    /**
     * Create page scrollbar
     */
    protected _createScrollBar () {
        if (!this.smoothScroll) {
            return;
        }
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
            store.dispatch({
                type: 'HIDE_POPUP_MENU',
            });
        });
    }
}
