import {
    FC, useState, cloneElement, Children, useEffect,
} from 'react';
import type { VideoPlayerProps } from '../../player';
import VideoPopupWindow from '../window';

const VideoPopupTrigger: FC<VideoPlayerProps> = ({
    children,
    ...player
}) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [popupIsShown, setPopupIsShown] = useState(false);

    useEffect(() => {
        setButtonDisabled(popupIsShown);
    }, [popupIsShown]);

    const newChildren = children ? Children.map(children, (child) => cloneElement(child as any, {
        disabled: buttonDisabled,
        onClick: () => {
            setPopupIsShown(true);
        },
    })) : [];

    return (
        <>
            {newChildren}
            <VideoPopupWindow
                isShown={popupIsShown}
                handleHide={() => {
                    setPopupIsShown(false);
                }}
                player={player}
            />
        </>
    );
};
export default VideoPopupTrigger;
