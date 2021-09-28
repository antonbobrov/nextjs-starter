import {
    FC, useEffect, useRef, useState,
} from 'react';
import styles from './styles.module.scss';

interface Data {
    id: string;
    onLoaded?: () => void;
}

const VimeoPlayer: FC<Data> = ({
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
        <div className={styles.vimeo_player}>
            <div ref={parentRef} />
        </div>
    );
};

export default VimeoPlayer;
