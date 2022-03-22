import {
    useCallback, useEffect, useRef, useState, VFC,
} from 'react';
import { addEventListener } from 'vevet-dom';
import routerCallbacks from 'src/router';
import Portal from '@/components/Portal';
import app from 'src/app';
import { useSelector } from 'react-redux';
import { selectLexicon } from '@/store/reducers/lexicon';
import { Timeline } from 'vevet';
import styles from './styles.module.scss';
import VideoPlayer, { VideoPlayerProps } from '../../player';

interface Props {
    show?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    player: VideoPlayerProps;
}

const VideoPopupWindow: VFC<Props> = ({
    show = false,
    onShow,
    onHide,
    player,
}) => {
    const lexicon = useSelector(selectLexicon);

    const parentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const [isActive, setIsActive] = useState(false);
    const [allowRender, setAllowRender] = useState(false);

    const [renderVideo, setRenderVideo] = useState(false);
    const [videoIsLoaded, setVideoIsLoaded] = useState(false);

    // set render children to true when the popup window should be shown
    useEffect(() => {
        if (show) {
            setIsActive(show);
            setAllowRender(true);
        }
    }, [show]);

    // launch callbacks
    useEffect(() => {
        if (isActive) {
            if (onShow) {
                onShow();
            }
        } else if (onHide) {
            onHide();
        }
        // set scroll classes
        app.html.classList.toggle(styles.prevent_scroll, isActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    // hide events
    useEffect(() => {
        const escapeListener = addEventListener(window, 'keydown', (evt) => {
            let bool: boolean | undefined = false;
            setIsActive((val) => {
                bool = val;
                return val;
            });
            if (evt.keyCode === 27 && bool) {
                setIsActive(false);
            }
        });
        const routerEvent = routerCallbacks.add('before', () => {
            setIsActive(false);
        });
        return () => {
            escapeListener.remove();
            routerEvent.remove();
        };
    }, []);



    // get container size
    const getContainerSize = useCallback(() => {
        if (!closeRef.current || !app) {
            return {
                marginTop: 0,
                width: 0,
                height: 0,
            };
        }
        const { viewport } = app;

        // get close-button sizes
        const closeButtonBounding = closeRef.current.getBoundingClientRect();
        const buttonTop = closeButtonBounding.top;
        const buttonHeight = closeButtonBounding.height;

        // get container sizes
        const maxWidth = viewport.width * (viewport.isPhone ? 1 : 0.8);
        const maxHeight = viewport.height;
        let height = maxHeight - (buttonTop * 3 + buttonHeight);
        let width = height * (1 / 0.5625);
        if (width > maxWidth) {
            width = maxWidth;
            height = maxWidth * 0.5625;
        }
        if (width > 1800) {
            width = 1800;
            height = 1800 * 0.5625;
        }
        return {
            marginTop: buttonHeight + buttonTop, // top +  / 2,
            width,
            height,
        };
    }, []);

    // resize the scene
    const resize = useCallback(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        const containerSizes = getContainerSize();
        containerRef.current.style.marginTop = `${containerSizes.marginTop}px`;
        container.style.width = `${containerSizes.width}px`;
        container.style.height = `${containerSizes.height}px`;
    }, [getContainerSize]);

    // set events to resize the scene
    useEffect(() => {
        if (!allowRender) {
            return undefined;
        }
        return app.viewport.add('', () => {
            resize();
        }, {
            name: 'Video Popup',
        }).remove;
    }, [isActive, allowRender, resize]);



    // animate the popup
    const timelineRef = useRef<Timeline>(null);
    useEffect(() => () => {
        timelineRef.current?.destroy();
    }, []);
    useEffect(() => {
        if (!allowRender) {
            return;
        }
        // create timeline if it doesn't exist yet
        if (!timelineRef.current) {
            // @ts-ignore
            timelineRef.current = new Timeline({
                duration: 500,
            });
            timelineRef.current.addCallback('progress', (progressData) => {
                resize();
                const parent = parentRef.current;
                if (parent) {
                    parent.style.visibility = progressData.progress > 0 ? 'visible' : 'hidden';
                    parent.style.opacity = `${progressData.easing}`;
                }
                if (progressData.progress === 0 && timelineRef.current?.isReversed) {
                    setAllowRender(false);
                }
                if (progressData.progress === 1 && !timelineRef.current?.isReversed) {
                    setRenderVideo(true);
                }
            });
        }
        if (isActive) {
            timelineRef.current.play();
        } else {
            timelineRef.current.reverse();
        }
    }, [allowRender, isActive, parentRef, resize]);



    return (
        allowRender ? (
            <Portal>
                <div
                    ref={parentRef}
                    className={[
                        styles.video_popup,
                    ].join(' ')}
                    role="dialog"
                    aria-hidden={!isActive}
                >

                    <button
                        ref={closeRef}
                        type="button"
                        className={styles.close}
                        onClick={() => {
                            setIsActive(false);
                        }}
                    >
                        {lexicon.navClose}
                    </button>

                    <div
                        ref={containerRef}
                        className={[
                            styles.container,
                            videoIsLoaded ? styles.loaded : '',
                        ].join(' ')}
                    >
                        <div
                            className={[
                                styles.wrapper,
                                videoIsLoaded ? styles.loaded : '',
                            ].join(' ')}
                        >
                            {renderVideo ? (
                                <VideoPlayer
                                    {...player}
                                    onLoaded={() => {
                                        if (player.onLoaded) {
                                            player.onLoaded();
                                        }
                                        setVideoIsLoaded(true);
                                    }}
                                />
                            ) : ''}
                        </div>
                    </div>

                </div>
            </Portal>
        ) : <></>
    );
};
export default VideoPopupWindow;
