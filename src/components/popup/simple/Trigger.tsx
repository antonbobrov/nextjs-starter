import {
    cloneElement, FC, useCallback, useState,
} from 'react';
import PopupSimple from '.';

interface Props {
    trigger: JSX.Element;
}

const PopupSimpleTrigger: FC<Props> = ({
    trigger,
    children,
}) => {
    const [isShown, setIsShown] = useState(false);

    // clone the trigger element
    const clonedTrigger = cloneElement(trigger, {
        ...trigger.props,
        onClick: (evt: MouseEvent) => {
            if (trigger.props.onClick) {
                trigger.props.onClick(evt);
            }
            setIsShown(true);
        },
    });

    return (
        <>
            {clonedTrigger}
            <PopupSimple
                isShown={isShown}
                handleHide={useCallback(() => {
                    setIsShown(false);
                }, [])}
            >
                {children}
            </PopupSimple>
        </>
    );
};

export default PopupSimpleTrigger;
