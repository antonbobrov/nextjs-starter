import { FC, useEffect, useState } from 'react';
import { addEventListener } from 'vevet-dom';
import routerCallbacks from 'src/router';
import Portal from '@/components/Portal';
import app from 'src/app';
import { useSelector } from 'react-redux';
import { selectLexicon } from '@/store/reducers/lexicon';
import styles from './styles.module.scss';

interface Props {
    isShown?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    usePadding?: boolean;
}

const PopupSimple: FC<Props> = ({
    isShown = false,
    onShow,
    onHide,
    usePadding = true,
    children,
}) => {
    const lexicon = useSelector(selectLexicon);

    const [isActive, setIsActive] = useState(false);
    const [renderChildren, setRenderChildren] = useState(false);
    useEffect(() => {
        if (isShown && !renderChildren) {
            setRenderChildren(true);
        }
    }, [isShown, renderChildren]);
    useEffect(() => {
        if (renderChildren) {
            setTimeout(() => {
                setIsActive(isShown);
            }, 100);
        }
    }, [isShown, renderChildren]);

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

    return (
        renderChildren ? (
            <Portal>
                <div
                    className={[
                        styles.popup_simple,
                        isActive ? styles.shown : '',
                    ].join(' ')}
                >
                    <div
                        className={[
                            styles.container,
                            isActive ? styles.shown : '',
                        ].join(' ')}
                    >
                        <div
                            className={[
                                styles.overlay,
                                isActive ? styles.shown : '',
                            ].join(' ')}
                            onClick={() => {
                                setIsActive(false);
                            }}
                            aria-hidden
                        />
                        <div
                            className={[
                                styles.scroll,
                                isActive ? styles.shown : '',
                            ].join(' ')}
                        >
                            <div
                                className={[
                                    styles.wrapper,
                                    usePadding ? styles.use_padding : '',
                                ].join(' ')}
                            >
                                <button
                                    type="button"
                                    className={styles.close}
                                    onClick={() => {
                                        setIsActive(false);
                                    }}
                                >
                                    {lexicon.navClose}
                                </button>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        ) : <></>
    );
};
export default PopupSimple;
