import {
    useState, cloneElement, Children, ReactNode, forwardRef, useRef, useImperativeHandle,
} from 'react';
import type { VideoPlayerProps } from '../../player';
import VideoPopupWindow from '../window';

export interface VideoPopupTriggerRef {
    show: () => void;
    hide: () => void;
}

interface Props extends VideoPlayerProps {
    children: ReactNode;
}

const VideoPopupTrigger = forwardRef<
    VideoPopupTriggerRef,
    Props
>(({
    children,
    ...player
}, ref) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const popupRef = useRef<VideoPopupTriggerRef>(null);

    useImperativeHandle(ref, () => ({
        show: () => {
            popupRef.current?.show();
        },
        hide: () => {
            popupRef.current?.hide();
        },
    }));

    const newChildren = children ? Children.map(children, (child) => cloneElement(child as any, {
        disabled: buttonDisabled,
        onClick: () => {
            popupRef.current?.show();
        },
    })) : [];

    return (
        <>
            {newChildren}
            <VideoPopupWindow
                ref={popupRef}
                onShow={() => {
                    setButtonDisabled(true);
                }}
                onHide={() => {
                    setButtonDisabled(false);
                }}
                player={player}
            />
        </>
    );
});
VideoPopupTrigger.displayName = 'VideoPopupTrigger';
export default VideoPopupTrigger;
