import {
    createElement, addEventListener, childOf,
} from 'vevet-dom';
import { NCallbacks, Timeline } from 'vevet';
import ReactDOM from 'react-dom';

import app from 'src/app';
import CustomLitElement from 'src/app/CustomLitElement';
import routerCallbacks from 'src/router';
import type { VideoPlayerSource } from '../player';
import styles from './styles.module.scss';

const tagName = 'video-popup';

export default class VideoPopup extends CustomLitElement {
    /**
     * Video Source Type
     */
    protected _videoSource?: VideoPlayerSource;
    get videoSource () {
        return this._videoSource;
    }
    set videoSource (val) {
        this._videoSource = val;
    }

    /**
     * MP4 Video
     */
    protected _videoSrc?: string;
    get videoSrc () {
        return this._videoSrc;
    }
    set videoSrc (val) {
        this._videoSrc = val;
    }

    /**
     * External Video ID
     */
    protected _videoID?: string;
    get videoID () {
        return this._videoID;
    }
    set videoID (val) {
        this._videoID = val;
    }

    /**
     * Previous active element
     */
    protected _activeElement?: Element | null;
    get activeElement () {
        return this._activeElement;
    }
    set activeElement (val) {
        this._activeElement = val;
    }

    /**
     * Close button
     */
    protected _closeButton?: HTMLButtonElement;
    /**
      * Video Wrapper
      */
    protected _container?: HTMLElement;
    /**
      * Video Container
      */
    protected _wrapper?: HTMLElement;

    // events
    protected _timeline?: Timeline;
    protected _viewportEvent?: NCallbacks.AddedCallback;
    protected _pageChangeEvent?: NCallbacks.AddedCallback;



    protected _connectedCallback () {
        super._connectedCallback();
        this.classList.add(tagName);
        this.classList.add(styles.video_popup);
        this._listeners = [];

        // create close button
        this._closeButton = createElement('button', {
            attr: [
                ['type', 'button'],
            ],
            class: styles.close,
            html: '<span>Close</span>',
            parent: this,
        });
        this._elementsToRemove.push(this._closeButton);
        // create container
        this._container = createElement('div', {
            class: styles.container,
            parent: this,
        });
        this._elementsToRemove.push(this._container);
        // create wrapper
        this._wrapper = createElement('div', {
            class: styles.wrapper,
            parent: this._container,
        });
        this._elementsToRemove.push(this._wrapper);

        // set "close" listener
        this._listeners.push(addEventListener(this._closeButton, 'click', (e) => {
            e.stopPropagation();
            this.hide();
        }));
        // set "escape" listener
        this._listeners.push(addEventListener(window, 'keydown', (e) => {
            if (e.keyCode === 27) {
                this.hide();
            }
        }));
        // set outside click listener
        this._listeners.push(addEventListener(this, 'click', (e) => {
            if (!this._container) {
                return;
            }
            if (!childOf(e.target as any, this._container)) {
                this.hide();
            }
        }));

        // hide the element on page change
        this._pageChangeEvent = routerCallbacks.add('before', () => {
            this.hide();
        });

        // show the popup
        this.show();

        // set focus on the close button
        this._closeButton.focus();

        // set resize events
        if (app) {
            this._viewportEvent = app.viewport.add('', () => {
                this._resize();
            }, {
                name: tagName,
            });
        }
    }

    protected _disconnectedCallback () {
        this._destroyPlayer();
        super._disconnectedCallback();

        this._closeButton = undefined;
        this._container = undefined;
        this._wrapper = undefined;

        if (this._timeline) {
            this._timeline.destroy();
            this._timeline = undefined;
        }
        if (this._viewportEvent) {
            this._viewportEvent.remove();
            this._viewportEvent = undefined;
        }
        if (this._pageChangeEvent) {
            this._pageChangeEvent.remove();
            this._pageChangeEvent = undefined;
        }
    }



    /**
     * Show the popup
     */
    public show () {
        // resize the scene before we show it
        this._resize();
        // show the scene
        if (this._timeline) {
            this._timeline.destroy();
        }
        this._timeline = new Timeline({
            duration: 350,
        });
        this._timeline.addCallback('progress', (data) => {
            this.style.opacity = `${data.easing}`;
        });
        this._timeline.addCallback('end', () => {
            this._createPlayer().catch(() => {
                if (this._wrapper) {
                    this._wrapper.innerHTML = 'Some error while loading the video';
                }
            }).finally(() => {
                if (this._container) {
                    this._container.classList.add('loaded');
                }
            }).catch(() => {});
        });
        this._timeline.play();
    }

    /**
     * Hide the popup
     */
    public hide () {
        // hide the popup
        if (this._timeline) {
            this._timeline.destroy();
        }
        this._timeline = new Timeline({
            duration: 350,
        });
        this._timeline.addCallback('progress', (data) => {
            this.style.opacity = `${1 - data.easing}`;
        });
        this._timeline.addCallback('end', () => {
            this.remove();
        });
        this._timeline.play();
        // restore focus
        if (this._activeElement instanceof HTMLElement) {
            this._activeElement.focus();
        }
    }



    /**
     * Resize the container
     */
    protected _resize () {
        // resize the container
        if (this._container) {
            const { containerSizes } = this;
            this._container.style.marginTop = `${containerSizes.marginTop}px`;
            this._container.style.width = `${containerSizes.width}px`;
            this._container.style.height = `${containerSizes.height}px`;
        }
    }

    /**
     * Get sizes of the container
     */
    protected get containerSizes () {
        if (!this._closeButton || !app) {
            return {
                marginTop: 0,
                width: 0,
                height: 0,
            };
        }
        const { viewport } = app;

        // get close-button sizes
        const closeButtonBounding = this._closeButton.getBoundingClientRect();
        const buttonTop = closeButtonBounding.top;
        const buttonHeight = closeButtonBounding.height;

        // get container sizes
        const maxWidth = viewport.width * (viewport.isPhone ? 1 : 0.8);
        const maxHeight = viewport.height;
        let height = maxHeight - (buttonTop * 3 + buttonHeight);
        let width = height * (1 / 0.5625);
        if (width > maxWidth) {
            width = maxWidth;
            height = maxWidth * 0.5625;
        }
        if (width > 1800) {
            width = 1800;
            height = 1800 * 0.5625;
        }
        return {
            marginTop: buttonHeight + buttonTop, // top +  / 2,
            width,
            height,
        };
    }



    /**
     * Create a player
     */
    protected _createPlayer () {
        return new Promise<void>((
            resolve,
            reject,
        ) => {
            import('../player').then((module) => {
                // check if can process the player
                if (!this._wrapper || !this.videoSource) {
                    reject();
                    return;
                }
                // render the player
                const Player = module.default;
                ReactDOM.render(<Player
                    source={this.videoSource}
                    src={this.videoSrc}
                    id={this.videoID}
                    onLoaded={() => {
                        resolve();
                    }}
                />, this._wrapper);
            }).catch(() => {
                reject();
            });
        });
    }

    protected _destroyPlayer () {
        if (this._wrapper) {
            ReactDOM.render(<></>, this._wrapper);
        }
    }
}
customElements.define(tagName, VideoPopup);
