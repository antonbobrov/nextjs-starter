import {
    forwardRef, ReactNode, useImperativeHandle, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { selectLexicon } from '@/store/reducers/lexicon';
import styles from './styles.module.scss';
import { VideoPlayerProps } from '../../player';
import VideoPopupWindow from '../window';

export interface VideoPopupFullsizeTriggerRef {
    show: () => void;
    hide: () => void;
}

interface Props extends VideoPlayerProps {
    children?: ReactNode;
}

const VideoPopupFullsizeTrigger = forwardRef<
    VideoPopupFullsizeTriggerRef,
    Props
>(({
    children,
    ...player
}, ref) => {
    const lexicon = useSelector(selectLexicon);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const popupRef = useRef<VideoPopupFullsizeTriggerRef>(null);

    useImperativeHandle(ref, () => ({
        show: () => {
            popupRef.current?.show();
        },
        hide: () => {
            popupRef.current?.hide();
        },
    }));

    return (
        <>
            <button
                type="button"
                className={styles.video_popup_fullsize_trigger}
                disabled={buttonDisabled}
                onClick={() => {
                    popupRef.current?.show();
                }}
            >
                {children || (
                    <span>{lexicon.playVideo}</span>
                )}
            </button>
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
VideoPopupFullsizeTrigger.displayName = 'VideoPopupFullsizeTrigger';
export default VideoPopupFullsizeTrigger;
