import {
    cloneElement, forwardRef, ReactNode,
    useImperativeHandle, useRef,
} from 'react';
import PopupSimple, { PopupSimpleRef } from '.';

export interface PopupSimpleTriggerRef {
    show: () => void;
    hide: () => void;
}

interface Props {
    trigger: JSX.Element;
    children: ReactNode;
}

const PopupSimpleTrigger = forwardRef<
    PopupSimpleTriggerRef,
    Props
>(({
    trigger,
    children,
}, ref) => {
    const popupRef = useRef<PopupSimpleRef>(null);

    useImperativeHandle(ref, () => ({
        show: () => {
            popupRef.current?.show();
        },
        hide: () => {
            popupRef.current?.hide();
        },
    }));

    // clone the trigger element
    const clonedTrigger = cloneElement(trigger, {
        ...trigger.props,
        onClick: (evt: MouseEvent) => {
            if (trigger.props.onClick) {
                trigger.props.onClick(evt);
            }
            popupRef.current?.show();
        },
    });

    return (
        <>
            {clonedTrigger}
            <PopupSimple
                ref={popupRef}
            >
                {children}
            </PopupSimple>
        </>
    );
});
PopupSimpleTrigger.displayName = 'PopupSimpleTrigger';
export default PopupSimpleTrigger;
