import { LitElement } from 'lit';
import { IAddEventListener } from 'vevet-dom';

export default abstract class CustomLitElement extends LitElement {
    // disconnected state
    protected _isDisconnected = false;
    get isDisconnected () {
        return this._isDisconnected;
    }

    // element to be removed when disconnected
    protected _elementsToRemove!: Element[];

    // event listenerss
    protected _listeners!: IAddEventListener[];



    createRenderRoot () {
        return this;
    }

    connectedCallback () {
        super.connectedCallback();
        this._isDisconnected = false;
        this._elementsToRemove = [];
        this._listeners = [];
        this._connectedCallback();
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this._isDisconnected = true;

        // remove elements
        this._elementsToRemove.forEach((el) => {
            el.remove();
        });

        // remove event listeners
        this._listeners.forEach((listener) => {
            listener.remove();
        });
        this._listeners = [];

        // disconnect
        this._disconnectedCallback();
    }



    /**
     * Connected callback
     */
    protected _connectedCallback () {
        this._isDisconnected = false;
    }

    /**
     * Disconnected callback
     */
    protected _disconnectedCallback () {
        this._isDisconnected = true;
    }
}
