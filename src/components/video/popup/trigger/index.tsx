import store from '@/store/store';
import {
    FC, useState, cloneElement, Children,
} from 'react';
import type { VideoPlayerSource } from '../../player';


interface Props {
    source: VideoPlayerSource;
    src?: string;
    id?: string;
}

const VideoPopupTrigger: FC<Props> = ({
    source,
    src,
    id,
    children,
}) => {
    const [disabled, setDisabled] = useState(false);

    const newChildren = children ? Children.map(children, (child) => cloneElement(child as any, {
        disabled,
        onClick: () => {
            store.dispatch({
                type: 'START_LOADING',
            });
            const { activeElement } = document;
            setDisabled(true);
            import('../index').then((module) => {
                const VideoPopup = module.default;
                const popup = new VideoPopup();
                popup.videoSource = source;
                popup.videoSrc = src;
                popup.videoID = id;
                popup.activeElement = activeElement;
                document.body.appendChild(popup);
                setDisabled(false);
            }).finally(() => {
                store.dispatch({
                    type: 'END_LOADING',
                });
            }).catch(() => {});
        },
    })) : [];

    return <>{newChildren}</>;
};
export default VideoPopupTrigger;
