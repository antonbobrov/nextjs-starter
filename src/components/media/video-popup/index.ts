import { LitElement } from 'lit';
import {
    createElement, addEventListener, IAddEventListener, childOf,
} from 'vevet-dom';
import { Timeline } from 'vevet';

import styles from './styles.module.scss';

const tagName = 'video-popup';
export type VideoPopupSource = 'srv' | 'yt' | 'vm';

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
     * Video Wrapper
     */
    protected _container!: HTMLElement;
    /**
      * Video Container
      */
    protected _wrapper!: HTMLElement;
    /**
     * YouTube player
     */
    protected _ytVideo?: any;
    /**
     * Vimeo player
     */
    protected _vmVideo?: any;

    // events
    protected _timeline?: Timeline;
    protected _listeners!: IAddEventListener[];



    createRenderRoot () {
        return this;
    }

    connectedCallback () {
        super.connectedCallback();
        this.classList.add(tagName);
        this.classList.add(styles.component);
        this._listeners = [];

        // create elements
        this._container = createElement('div', {
            class: styles.container,
            parent: this,
        });
        this._wrapper = createElement('div', {
            class: styles.wrapper,
            parent: this._container,
        });

        // set "escape" listener
        this._listeners.push(addEventListener(window, 'keydown', (e) => {
            if (e.keyCode === 27) {
                this.hide();
            }
        }));
        // set outside click listener
        this._listeners.push(addEventListener(this, 'click', (e) => {
            if (!childOf(e.target as any, this._container)) {
                this.hide();
            }
        }));

        // show the popup
        this.show();
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this._wrapper.remove();
        this._container.remove();

        this._destroyPlayer();

        if (this._timeline) {
            this._timeline.destroy();
            this._timeline = undefined;
        }
        this._listeners.forEach((listener) => {
            listener.remove();
        });
        this._listeners = [];
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
                const player = mod.default(this._wrapper, {
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
                const VimeoPlayer = mod.default;
                const player = new VimeoPlayer(this._wrapper, {
                    id: parseInt(this.videoID || '0', 10),
                    controls: false,
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
     * Show the popup
     */
    public show () {
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
                this._container.classList.add('loaded');
            }).catch(() => {
                this._wrapper.innerHTML = 'Some error while loading the video';
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
