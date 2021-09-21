import { LitElement } from 'lit';
import { Ctx2D, Timeline } from 'vevet';
import styles from './styles.module.scss';

const tagName = 'loader-curtain';
const duration = 350;
const color = '#eee';

export default class LoaderCurtain extends LitElement {
    // elements
    protected _ctx2D?: Ctx2D;

    // events
    protected _timeline?: Timeline;

    // in-progress
    protected _inProgress = 0;
    get inProgress () {
        return this._inProgress;
    }
    set inProgress (val: number) {
        this._inProgress = val;
    }

    // out-progress
    protected _outProgress = 0;
    get outProgress () {
        return this._outProgress;
    }
    set outProgress (val: number) {
        this._outProgress = val;
    }



    connectedCallback () {
        super.connectedCallback();
        this.classList.add(tagName);
        this._create();
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this._destroy();
    }

    createRenderRoot () {
        return this;
    }



    /**
     * Create the scene
     */
    protected _create () {
        this.classList.add(styles.container);

        // create canvas
        this._ctx2D = new Ctx2D({
            container: this,
        });
        this._ctx2D.addCallback('resize', () => {
            this._render();
        });
    }

    /**
     * Destroy the scene
     */
    protected _destroy () {
        if (this._ctx2D) {
            this._ctx2D.destroy();
            this._ctx2D = undefined;
        }
        if (this._timeline) {
            this._timeline.destroy();
            this._timeline = undefined;
        }
    }



    /**
     * Show the scene
     */
    public show () {
        return new Promise<void>((
            resolve,
        ) => {
            if (this._timeline) {
                this._timeline.destroy();
            }
            this._timeline = new Timeline({
                duration,
            });
            this._timeline.addCallback('start', () => {
                this.style.display = 'block';
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
            if (this._timeline) {
                this._timeline.destroy();
            }
            this._timeline = new Timeline({
                duration,
            });
            this._timeline.addCallback('start', () => {
                this.style.display = 'block';
                this._ctx2D?.resize();
            });
            this._timeline.addCallback('progress', (data) => {
                this.inProgress = 1;
                this.outProgress = data.easing;
                this._render();
            });
            this._timeline.addCallback('end', () => {
                this.style.display = 'none';
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

        // calculate y coord
        const y = (this.outProgress === 0 ? (1 - this.inProgress) : -this.outProgress) * height;

        // render bg
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(0, y, width, height);
        ctx.closePath();
        ctx.restore();
    }
}
customElements.define(tagName, LoaderCurtain);
