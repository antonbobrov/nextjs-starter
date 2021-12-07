import { FC, useEffect } from 'react';
import VideoPlayerMp4 from './mp4';
import VideoPlayerVimeo from './vimeo';
import VideoPlayerYouTube from './youtube';
import styles from './styles.module.scss';

export type VideoPlayerSource = 'mp4' | 'yt' | 'vm';

interface Props {
    source: VideoPlayerSource;
    src?: string;
    id?: string;
    onLoaded?: () => void;
}

const VideoPlayer: FC<Props> = ({
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
    }, [source, onLoaded]);


    if (source === 'mp4' && !!src) {
        return (
            <div className={styles.video_player}>
                <VideoPlayerMp4
                    src={src}
                    onLoaded={onLoaded}
                />
            </div>
        );
    }

    if (source === 'yt' && !!id) {
        return (
            <div className={styles.video_player}>
                <VideoPlayerYouTube
                    id={id}
                    onLoaded={onLoaded}
                />
            </div>
        );
    }

    if (source === 'vm' && !!id) {
        return (
            <div className={styles.video_player}>
                <VideoPlayerVimeo
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
