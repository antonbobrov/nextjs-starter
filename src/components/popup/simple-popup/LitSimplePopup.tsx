import {
    createElement, addEventListener, selectOne, childOf,
} from 'vevet-dom';
import { Timeline, utils } from 'vevet';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import easingProgress from 'easing-progress';
import settings from './settings';
import styles from './styles.module.scss';
import CustomLitElement from '../../../app/CustomLitElement';

const { tagName } = settings;

export default class LitSimplePopup extends CustomLitElement {
    /**
     * Content selector.
     * String or Element for DOM, or React children
     */
    protected _contents: string | Element | ReactNode;
    get contents () {
        return this._contents;
    }
    set contents (val) {
        this._contents = val;
    }



    /**
     * Overlay element
     */
    protected _overlay?: HTMLElement;
    /**
     * Container
     */
    protected _container?: HTMLElement;
    /**
     * Scroll outer
     */
    protected _scroll?: HTMLElement;
    /**
     * Wrapper
     */
    protected _wrapper?: HTMLElement;
    /**
     * Children outer
     */
    protected _children?: HTMLElement;
    /**
     * Close button
     */
    protected _closeButton?: HTMLButtonElement;



    // events
    protected _timeline?: Timeline;

    // states
    protected _inAction?: boolean;



    protected _connectedCallback () {
        super._connectedCallback();
        this.classList.add(tagName);
        this.classList.add(styles.simple_popup);

        // create popup overlay
        this._overlay = createElement('div', {
            class: styles.simple_popup__overlay,
            parent: this,
        });
        this._elementsToRemove.push(this._overlay);

        // create popup container
        this._container = createElement('div', {
            class: styles.simple_popup__container,
            parent: this,
        });
        this._elementsToRemove.push(this._container);

        // create popup scroll outer
        this._scroll = createElement('div', {
            class: styles.simple_popup__scroll,
            parent: this._container,
        });
        this._elementsToRemove.push(this._scroll);

        // create popup wrapper
        this._wrapper = createElement('div', {
            class: styles.simple_popup__wrapper,
            parent: this._scroll,
        });
        this._elementsToRemove.push(this._wrapper);

        // create close button
        this._closeButton = createElement('button', {
            attr: [
                ['type', 'button'],
            ],
            class: styles.simple_popup__close,
            html: `<span>${'Close'}</span>`,
            parent: this._wrapper,
        });
        this._elementsToRemove.push(this._closeButton);

        // create popup children outer
        this._children = createElement('div', {
            class: styles.simple_popup__children,
            parent: this._wrapper,
        });
        this._elementsToRemove.push(this._children);

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
            if (!this._wrapper) {
                return;
            }
            if (!childOf(e.target as any, this._wrapper)) {
                this.hide();
            }
        }));

        // append contents
        this._appendChildren().then(() => {
            this.show();
        }).catch(() => {
            throw new Error(`No children for ${tagName}`);
        });
    }

    disconnectedCallback () {
        super.disconnectedCallback();

        // reset vars
        this._overlay = undefined;
        this._container = undefined;
        this._scroll = undefined;
        this._closeButton = undefined;
        this._wrapper = undefined;
        this._children = undefined;

        // destroy timelines
        if (this._timeline) {
            this._timeline.destroy();
            this._timeline = undefined;
        }
    }



    /**
     * Append popup children to the container
     */
    protected _appendChildren (
        children = this._contents,
    ) {
        return new Promise<void>((
            resolve, reject,
        ) => {
            if (!this._children) {
                return;
            }
            // html element
            if (
                typeof children === 'string'
                || children instanceof Element
            ) {
                const outer = selectOne(children);
                if (outer) {
                    while (outer.firstChild) {
                        this._children.appendChild(outer.firstChild);
                    }
                    resolve();
                } else {
                    reject();
                }
            } else {
                // react element
                ReactDOM.render(children as any, this._children, () => {
                    resolve();
                });
                return;
            }
            reject();
        });
    }

    /**
     * Remove popup children
     */
    protected _removeChildren (
        children = this._contents,
    ) {
        return new Promise<void>((
            resolve, reject,
        ) => {
            if (!this._children) {
                return;
            }
            // html element
            if (
                typeof children === 'string'
                || children instanceof Element
            ) {
                const outer = selectOne(children);
                if (outer) {
                    while (this._children.firstChild) {
                        outer.appendChild(this._children.firstChild);
                    }
                    resolve();
                } else {
                    reject();
                }
            } else {
                // react element
                ReactDOM.render(<></>, this._children, () => {
                    resolve();
                });
                return;
            }
            reject();
        });
    }



    /**
     * Show the popup
     */
    public show () {
        if (this._inAction) {
            return;
        }
        this._inAction = true;
        // show the scene
        if (this._timeline) {
            this._timeline.destroy();
        }
        this._timeline = new Timeline({
            duration: settings.duration,
        });
        this._timeline.addCallback('progress', (data) => {
            this._renderAnimation(data.progress);
        });
        this._timeline.addCallback('end', () => {
            this._inAction = false;
        });
        this._timeline.play();
    }

    /**
     * Hide the popup
     */
    public hide () {
        if (this._inAction) {
            return;
        }
        this._inAction = true;
        // show the scene
        if (this._timeline) {
            this._timeline.destroy();
        }
        this._timeline = new Timeline({
            duration: settings.duration,
        });
        this._timeline.addCallback('progress', (data) => {
            this._renderAnimation(1 - data.progress);
        });
        this._timeline.addCallback('end', () => {
            this._inAction = false;
            this._removeChildren().then(() => {
                this.remove();
            });
        });
        this._timeline.play();
    }



    /**
     * Render popup elements
     */
    protected _renderAnimation (
        globalProgress: number,
    ) {
        // render overlay
        if (this._overlay) {
            const progress = easingProgress(
                utils.math.boundVal(
                    utils.math.scopeProgress(
                        globalProgress,
                        settings.overlay.scope as [number, number],
                    ),
                ),
                settings.overlay.easing,
            );
            this._overlay.style.opacity = `${progress}`;
        }

        // render container
        if (this._container) {
            const progress = easingProgress(
                utils.math.boundVal(
                    utils.math.scopeProgress(
                        globalProgress,
                        settings.container.scope as [number, number],
                    ),
                ),
                settings.overlay.easing,
            );
            this._container.style.opacity = `${progress}`;
        }
    }
}
customElements.define(tagName, LitSimplePopup);
