import {
    useEffect, useRef, useState, VFC,
} from 'react';
import styles from './styles.module.scss';

interface Props {
    id: string;
    onLoaded?: () => void;
}

const VideoPlayerVimeo: VFC<Props> = ({
    id,
    onLoaded = () => {},
}) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let player: any | undefined;
        import('@vimeo/player').then((module) => {
            const Player = module.default;
            if (parentRef.current) {
                player = new Player(parentRef.current, {
                    id: parseInt(id || '0', 10),
                    title: false,
                    portrait: false,
                });
                player.on('loaded', () => {
                    setIsLoaded(true);
                });
            } else {
                setIsLoaded(true);
            }
        }).catch(() => {});
        return () => {
            if (player) {
                player.destroy();
            }
        };
    }, [id]);

    useEffect(() => {
        if (isLoaded) {
            onLoaded();
        }
    }, [isLoaded, onLoaded]);

    return (
        <div className={styles.video_player_vimeo}>
            <div ref={parentRef} />
        </div>
    );
};

export default VideoPlayerVimeo;
