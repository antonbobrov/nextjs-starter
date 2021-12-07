import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStorePageProps } from '@/store/reducers/page';
import styles from './styles.module.scss';
import { VideoPlayerSource } from '../../player';

interface Props {
    source: VideoPlayerSource;
    src?: string;
    id?: string;
}

const VideoPopupFullsizeTrigger: FC<Props> = ({
    source,
    src,
    id,
    children,
}) => {
    const pageProps = useSelector(selectStorePageProps);
    const [disabled, setDisabled] = useState(false);

    return (
        <button
            type="button"
            className={styles.video_popup_fullsize_trigger}
            disabled={disabled}
            onClick={() => {
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
                });
            }}
        >
            {children || (
                <span>{pageProps.lexicon.playVideo}</span>
            )}
        </button>
    );
};
export default VideoPopupFullsizeTrigger;
