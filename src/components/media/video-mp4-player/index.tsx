import {
    FC, useEffect, useRef, useState,
} from 'react';
import type { VideoJsPlayer as VideoJsPlayerType } from 'video.js';
import app from '../../../app';
import styles from './styles.module.scss';

interface Data {
    src: string;
    autoplay?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    onLoaded?: () => void;
}

const VideoMp4Player: FC<Data> = ({
    src,
    autoplay = false,
    controls = true,
    playsInline = true,
    onLoaded = () => {},
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [playerIsReady, setPlayerIsReady] = useState(false);
    const [usePlayer] = useState(!app.isMobile);

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
    }, []);

    useEffect(() => {
        if (
            isLoaded
            && ((usePlayer && playerIsReady) || !usePlayer)
            && !!onLoaded
        ) {
            onLoaded();
        }
    }, [isLoaded, playerIsReady, usePlayer]);

    return (
        <div className={styles.video_player}>
            <div
                data-vjs-player
                className="video-js"
            >
                <video
                    ref={videoRef}
                    disablePictureInPicture
                    preload="auto"
                    crossOrigin="anonymous"
                    autoPlay={autoplay}
                    controls={controls}
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

export default VideoMp4Player;
