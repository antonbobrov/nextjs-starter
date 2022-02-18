import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLexicon } from '@/store/reducers/lexicon';
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
    const lexicon = useSelector(selectLexicon);
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
                }).catch(() => {});
            }}
        >
            {children || (
                <span>{lexicon.playVideo}</span>
            )}
        </button>
    );
};
export default VideoPopupFullsizeTrigger;
