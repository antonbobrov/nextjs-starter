import { FC, useState } from 'react';
import type { VideoPopupSource } from '../video-popup';
import styles from './styles.module.scss';

interface Data {
    source: VideoPopupSource;
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

    return (
        <button
            type="button"
            className={styles.button}
            disabled={disabled}
            onClick={() => {
                setDisabled(true);
                import('../video-popup/index').then((module) => {
                    const VideoPopup = module.default;
                    const popup = new VideoPopup();
                    popup.videoSource = source;
                    popup.videoMp4 = src;
                    popup.videoID = id;
                    document.body.appendChild(popup);
                    setDisabled(false);
                });
            }}
        >
            {children || (
                <span>Play video</span>
            )}
        </button>
    );
};
export default VideoPopupButton;
