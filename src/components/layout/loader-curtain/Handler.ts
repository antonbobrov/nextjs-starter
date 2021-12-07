import { Easing } from 'easing-progress';
import { Ctx2D, Timeline } from 'vevet';
import settings from './settings';

export default class LayoutLoaderCurtainHandler {
    // elements
    protected _ctx2D?: Ctx2D;

    // events
    protected _timeline?: Timeline;

    // in-progress
    protected _inProgress: number;
    get inProgress () {
        return this._inProgress;
    }
    set inProgress (val: number) {
        this._inProgress = val;
    }

    // out-progress
    protected _outProgress: number;
    get outProgress () {
        return this._outProgress;
    }
    set outProgress (val: number) {
        this._outProgress = val;
    }

    constructor (
        protected _parent: HTMLElement,
    ) {
        this._inProgress = 0;
        this._outProgress = 0;
    }

    protected get parent () {
        return this._parent;
    }

    protected get timelineSettings () {
        return {
            duration: settings.duration,
            easing: Easing.easeInOutSine,
        };
    }

    protected _createCtx () {
        if (this._ctx2D) {
            return;
        }
        this._ctx2D = new Ctx2D({
            container: this._parent,
            append: true,
        });
    }



    /**
     * Show the scene
     */
    public show () {
        return new Promise<void>((
            resolve,
        ) => {
            this._createCtx();
            if (this._timeline) {
                this._timeline.destroy();
            }
            this._timeline = new Timeline(this.timelineSettings);
            this._timeline.addCallback('start', () => {
                this.parent.style.display = 'block';
                this._ctx2D?.resize();
            });
            this._timeline.addCallback('progress', (data) => {
                this.inProgress = data.easing;
                this.outProgress = 0;
                this._render();
            });
            this._timeline.addCallback('end', () => {
                resolve();
            });
            this._timeline.play();
        });
    }

    /**
     * Hide the scene
     */
    public hide () {
        return new Promise<void>((
            resolve,
        ) => {
            this._createCtx();
            if (this._timeline) {
                this._timeline.destroy();
            }
            this._timeline = new Timeline(this.timelineSettings);
            this._timeline.addCallback('start', () => {
                this.parent.style.display = 'block';
                this._ctx2D?.resize();
            });
            this._timeline.addCallback('progress', (data) => {
                this.inProgress = 1;
                this.outProgress = data.easing;
                this._render();
            });
            this._timeline.addCallback('end', () => {
                this.parent.style.display = 'none';
                resolve();
            });
            this._timeline.play();
        });
    }



    /**
     * Render the scene
     */
    protected _render () {
        if (!this._ctx2D) {
            return;
        }
        // vars
        const { ctx, width, height } = this._ctx2D;
        if (width <= 0 || height <= 0) {
            return;
        }

        const y = (this.outProgress === 0 ? (1 - this.inProgress) : -this.outProgress) * height;

        // render bg
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.fillStyle = settings.color;
        ctx.fillRect(0, y, width, height);
        ctx.closePath();
        ctx.restore();
    }



    /**
     * Destroy the scene
     */
    public destroy () {
        if (this._ctx2D) {
            this._ctx2D.destroy();
            this._ctx2D = undefined;
        }
        if (this._timeline) {
            this._timeline.destroy();
            this._timeline = undefined;
        }
    }
}
