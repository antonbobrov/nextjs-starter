import {
    FC, useEffect, useRef, useState,
} from 'react';
import type { VideoJsPlayer as VideoJsPlayerType } from 'video.js';
import app from 'src/app';
import styles from './styles.module.scss';

interface Props {
    src: string;
    autoplay?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    onLoaded?: () => void;
}

const VideoPlayerMp4: FC<Props> = ({
    src,
    autoplay = false,
    controls = true,
    playsInline = true,
    onLoaded = () => {},
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [playerIsReady, setPlayerIsReady] = useState(false);
    const [usePlayer] = useState(!!((app && !app.isMobile)));

    useEffect(() => {
        if (!videoRef.current || !usePlayer) {
            return () => {};
        }
        let destroyed = false;
        let player: VideoJsPlayerType | undefined;
        import('video.js').then((module) => {
            if (destroyed) {
                return;
            }
            if (videoRef.current) {
                player = module.default(videoRef.current, {});
                setPlayerIsReady(true);
            }
        });
        return () => {
            destroyed = true;
            if (player) {
                player.dispose();
            }
        };
    }, [usePlayer, videoRef]);

    useEffect(() => {
        if (
            isLoaded
            && ((usePlayer && playerIsReady) || !usePlayer)
            && !!onLoaded
        ) {
            onLoaded();
        }
    }, [isLoaded, playerIsReady, usePlayer, onLoaded]);

    return (
        <div className={styles.video_player_mp4}>
            <div
                data-vjs-player
                className="video-js"
            >
                <video
                    ref={videoRef}
                    disablePictureInPicture
                    preload="auto"
                    autoPlay={autoplay}
                    controls={controls}
                    controlsList="nodownload"
                    playsInline={playsInline}
                    onLoadedMetadata={() => {
                        setIsLoaded(true);
                    }}
                >
                    <source
                        src={`${src}#t=0.1`}
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    );
};

export default VideoPlayerMp4;
