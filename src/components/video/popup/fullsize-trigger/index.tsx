import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLexicon } from '@/store/reducers/lexicon';
import styles from './styles.module.scss';
import { VideoPlayerProps } from '../../player';
import VideoPopupWindow from '../window';

const VideoPopupFullsizeTrigger: FC<VideoPlayerProps> = ({
    children,
    ...player
}) => {
    const lexicon = useSelector(selectLexicon);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [popupIsShown, setPopupIsShown] = useState(false);

    useEffect(() => {
        setButtonDisabled(popupIsShown);
    }, [popupIsShown]);

    return (
        <>
            <button
                type="button"
                className={styles.video_popup_fullsize_trigger}
                disabled={buttonDisabled}
                onClick={() => {
                    setPopupIsShown(true);
                }}
            >
                {children || (
                    <span>{lexicon.playVideo}</span>
                )}
            </button>
            <VideoPopupWindow
                isShown={popupIsShown}
                onHide={() => {
                    setPopupIsShown(false);
                }}
                player={player}
            />
        </>
    );
};
export default VideoPopupFullsizeTrigger;
