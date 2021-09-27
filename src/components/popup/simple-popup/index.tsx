import {
    cloneElement, FC, useState,
} from 'react';
import app from '../../../app';

interface Data {
    trigger: JSX.Element;
    contentSelector: string | Element;
}

const SimplePopup: FC<Data> = ({
    trigger,
    contentSelector,
    children,
}) => {
    const [loading, setLoading] = useState(false);

    // clone the trigger element
    const clonedTrigger = cloneElement(trigger, {
        ...trigger.props,
        disabled: loading,
        onClick: () => {
            setLoading(true);
            renderPopup().then(() => {
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        },
    });

    /**
     * Load & render the popup
     */
    function renderPopup () {
        return new Promise<void>((
            resolve, reject,
        ) => {
            import('./LitSimplePopup').then((module) => {
                const LitSimplePopup = module.default;
                const popup = new LitSimplePopup();
                popup.contents = children || contentSelector;
                app.body.appendChild(popup);
                resolve();
            }).catch(() => [
                reject(),
            ]);
        });
    }

    return (
        <>
            {clonedTrigger}
        </>
    );
};

export default SimplePopup;
