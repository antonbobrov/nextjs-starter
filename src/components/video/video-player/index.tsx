import { FC, useEffect } from 'react';
import VideoMp4Player from '../video-mp4-player';
import VimeoPlayer from '../vimeo-player';
import YouTubePlayer from '../youtube-player';
import styles from './styles.module.scss';

export type VideoPlayerSource = 'mp4' | 'yt' | 'vm';

interface Data {
    source: VideoPlayerSource;
    src?: string;
    id?: string;
    onLoaded?: () => void;
}

const VideoPlayer: FC<Data> = ({
    source,
    src,
    id,
    onLoaded = () => {},
}) => {
    useEffect(() => {
        if (
            source !== 'mp4'
            && source !== 'vm'
            && source !== 'yt'
        ) {
            if (onLoaded) {
                onLoaded();
            }
        }
    }, []);


    if (source === 'mp4' && !!src) {
        return (
            <div className={styles.video_player}>
                <VideoMp4Player
                    src={src}
                    onLoaded={onLoaded}
                />
            </div>
        );
    }

    if (source === 'yt' && !!id) {
        return (
            <div className={styles.video_player}>
                <YouTubePlayer
                    id={id}
                    onLoaded={onLoaded}
                />
            </div>
        );
    }

    if (source === 'vm' && !!id) {
        return (
            <div className={styles.video_player}>
                <VimeoPlayer
                    id={id}
                    onLoaded={onLoaded}
                />
            </div>
        );
    }

    return (
        <div className={styles.video_player}>
            Unexpected video source
        </div>
    );
};
export default VideoPlayer;
