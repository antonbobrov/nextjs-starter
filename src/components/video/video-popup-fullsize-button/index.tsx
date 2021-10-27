import { FC, useState } from 'react';
import PageContext from '../../../store/PageContext';
import type { VideoPlayerSource } from '../video-player';
import styles from './styles.module.scss';

interface Data {
    source: VideoPlayerSource;
    src?: string;
    id?: string;
}

const VideoPopupFullsizeButton: FC<Data> = ({
    source,
    src,
    id,
    children,
}) => {
    const [disabled, setDisabled] = useState(false);

    return (
        <PageContext.Consumer>
            {(pageProps) => (
                <button
                    type="button"
                    className={styles.video_popup_fullsize_button}
                    disabled={disabled}
                    onClick={() => {
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
                        });
                    }}
                >
                    {children || (
                        <span>{pageProps.lexicon.playVideo}</span>
                    )}
                </button>
            )}

        </PageContext.Consumer>
    );
};
export default VideoPopupFullsizeButton;
