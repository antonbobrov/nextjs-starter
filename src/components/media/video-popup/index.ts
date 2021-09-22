import { LitElement } from 'lit';
import {
    createElement, addEventListener, IAddEventListener, childOf,
} from 'vevet-dom';
import { NCallbacks, Timeline } from 'vevet';

import styles from './styles.module.scss';
import app from '../../../app';

const tagName = 'video-popup';
export type VideoPopupSource = 'mp4' | 'yt' | 'vm';

export default class VideoPopup extends LitElement {
    /**
     * Video Source Type
     */
    protected _videoSource?: VideoPopupSource;
    get videoSource () {
        return this._videoSource;
    }
    set videoSource (val) {
        this._videoSource = val;
    }

    /**
     * MP4 Video
     */
    protected _videoMp4?: string;
    get videoMp4 () {
        return this._videoMp4;
    }
    set videoMp4 (val) {
        this._videoMp4 = val;
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
    /**
     * YouTube player
     */
    protected _ytVideo?: any;
    /**
     * Vimeo player
     */
    protected _vmVideo?: any;
    /**
     * Video player
     */
    protected _mp4Video?: any;

    // events
    protected _timeline?: Timeline;
    protected _listeners!: IAddEventListener[];
    protected _viewportEvent?: NCallbacks.AddedCallback;



    createRenderRoot () {
        return this;
    }

    connectedCallback () {
        super.connectedCallback();
        this.classList.add(tagName);
        this.classList.add(styles.component);
        this._listeners = [];

        // create elements
        this._closeButton = createElement('button', {
            attr: [
                ['type', 'button'],
            ],
            class: styles.close,
            html: `<span>${'Close'}</span>`,
            parent: this,
        });
        this._container = createElement('div', {
            class: styles.container,
            parent: this,
        });
        this._wrapper = createElement('div', {
            class: styles.wrapper,
            parent: this._container,
        });

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

        // show the popup
        this.show();

        // set resize events
        if (app) {
            this._viewportEvent = app.viewport.add('', () => {
                this._resize();
            }, {
                name: tagName,
            });
        }
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        if (this._closeButton) {
            this._closeButton.remove();
            this._closeButton = undefined;
        }
        if (this._wrapper) {
            this._wrapper.remove();
            this._wrapper = undefined;
        }
        if (this._container) {
            this._container.remove();
            this._container = undefined;
        }

        this._destroyPlayer();

        if (this._timeline) {
            this._timeline.destroy();
            this._timeline = undefined;
        }
        this._listeners.forEach((listener) => {
            listener.remove();
        });
        this._listeners = [];
        if (this._viewportEvent) {
            this._viewportEvent.remove();
            this._viewportEvent = undefined;
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
            this._destroyPlayer();
            if (this._videoSource === 'yt') {
                this._createYouTubePlayer().then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
                return;
            }
            if (this._videoSource === 'vm') {
                this._createVimeoPlayer().then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
                return;
            }
            if (this._videoSource === 'mp4') {
                this._createMp4Player().then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
                return;
            }
            reject();
        });
    }

    protected _destroyPlayer () {
        if (this._ytVideo) {
            this._ytVideo.destroy();
            this._ytVideo = undefined;
        }
        if (this._vmVideo) {
            this._vmVideo.destroy();
            this._vmVideo = undefined;
        }
        if (this._mp4Video) {
            this._mp4Video.destroy();
            this._mp4Video = undefined;
        }
    }

    /**
     * Create a YouTube Player
     */
    protected _createYouTubePlayer () {
        return new Promise<void>((
            resolve,
            reject,
        ) => {
            if (!this.videoID) {
                reject();
                return;
            }
            import('youtube-player').then((mod) => {
                if (!this._wrapper) {
                    reject();
                    return;
                }
                const Module = mod.default;
                const player = Module(this._wrapper, {
                    videoId: this.videoID,
                    playerVars: {
                        modestbranding: 1,
                        iv_load_policy: 3,
                        enablejsapi: 1,
                    },
                });
                this._ytVideo = player;
                player.on('ready', () => {
                    resolve();
                });
            }).catch(() => {
                reject();
            });
        });
    }

    /**
     * Create a Vimeo Player
     */
    protected _createVimeoPlayer () {
        return new Promise<void>((
            resolve,
            reject,
        ) => {
            if (!this.videoID) {
                reject();
                return;
            }
            import('@vimeo/player').then((mod) => {
                if (!this._wrapper) {
                    reject();
                    return;
                }
                const Module = mod.default;
                const player = new Module(this._wrapper, {
                    id: parseInt(this.videoID || '0', 10),
                    title: false,
                    portrait: false,
                });
                player.on('loaded', () => {
                    resolve();
                });
                this._vmVideo = player;
            }).catch(() => {
                reject();
            });
        });
    }

    /**
     * Create a MP4 Video Player
     */
    protected _createMp4Player () {
        return new Promise<void>((
            resolve,
            reject,
        ) => {
            if (!this.videoMp4 || !this._wrapper) {
                reject();
                return;
            }
            // create a video element
            const video = document.createElement('video');
            video.disablePictureInPicture = true;
            video.setAttribute('preload', 'auto');
            video.crossOrigin = 'anonymous';
            video.autoplay = true;
            video.controls = true;
            video.playsInline = true;
            // create video source
            const source = document.createElement('source');
            source.setAttribute('src', `${this.videoMp4}#t=0.1`);
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source);
            // append the video
            this._wrapper.appendChild(video);

            resolve();
        });
    }



    /**
     * Show the popup
     */
    public show () {
        // resize the scene
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
            this._createPlayer().then(() => {
                if (this._container) {
                    this._container.classList.add('loaded');
                }
            }).catch(() => {
                if (this._wrapper) {
                    this._wrapper.innerHTML = 'Some error while loading the video';
                }
            });
        });
        this._timeline.play();
    }

    /**
     * Hide the popup
     */
    public hide () {
        // stop video
        try {
            if (this._ytVideo) {
                this._ytVideo.pauseVideo();
            }
            if (this._vmVideo) {
                this._vmVideo.pauseVideo();
            }
        } catch (e) {
            //
        }
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
    }
}
customElements.define(tagName, VideoPopup);
