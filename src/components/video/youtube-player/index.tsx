import {
    FC, useEffect, useRef, useState,
} from 'react';
import styles from './styles.module.scss';

interface Data {
    id: string;
    onLoaded?: () => void;
}

const YouTubePlayer: FC<Data> = ({
    id,
    onLoaded = () => {},
}) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let player: any | undefined;
        import('youtube-player').then((module) => {
            if (parentRef.current) {
                player = module.default(parentRef.current, {
                    videoId: id,
                    playerVars: {
                        modestbranding: 1,
                        iv_load_policy: 3,
                        enablejsapi: 1,
                    },
                });
                player.on('ready', () => {
                    setIsLoaded(true);
                });
            } else {
                setIsLoaded(true);
            }
        });
        return () => {
            if (player) {
                player.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (isLoaded) {
            onLoaded();
        }
    }, [isLoaded]);

    return (
        <div className={styles.youtube_player}>
            <div ref={parentRef} />
        </div>
    );
};

export default YouTubePlayer;
