import {
    FC, useState, cloneElement, Children,
} from 'react';
import pageIsLoading from '../../../store/pageIsLoading';
import type { VideoPlayerSource } from '../video-player';


interface Data {
    source: VideoPlayerSource;
    src?: string;
    id?: string;
}

const VideoPopupButton: FC<Data> = ({
    source,
    src,
    id,
    children,
}) => {
    const [disabled, setDisabled] = useState(false);

    const newChildren = children ? Children.map(children, (child) => cloneElement(child as any, {
        disabled,
        onClick: () => {
            pageIsLoading.start();
            const { activeElement } = document;
            setDisabled(true);
            import('../video-popup/index').then((module) => {
                const VideoPopup = module.default;
                const popup = new VideoPopup();
                popup.videoSource = source;
                popup.videoSrc = src;
                popup.videoID = id;
                popup.activeElement = activeElement;
                document.body.appendChild(popup);
                setDisabled(false);
            }).finally(() => {
                pageIsLoading.end();
            });
        },
    })) : [];

    return <>{newChildren}</>;
};
export default VideoPopupButton;
