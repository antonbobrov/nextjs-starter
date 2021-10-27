import { Timeline } from 'vevet';
import {
    useContext, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { store } from '../../../store/store';
import app from '../../../app';
import routerCallbacks from '../../../router';
import PageContext from '../../../store/PageContext';
import LanguagesList from '../languages/list';

const duration = 450;

const PopupMenu = () => {
    const pageProps = useContext(PageContext);
    let focusElement: Element | null = null;
    const { siteMenu, languages, lexicon } = pageProps;
    const parentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // create a timeline
        const timeline = new Timeline({
            duration,
        });
        timeline.addCallback('progress', (data) => {
            const parent = parentRef.current;
            const overlay = overlayRef.current;
            const container = containerRef.current;
            if (parent) {
                if (data.progress === 0) {
                    parent.style.visibility = 'hidden';
                } else {
                    parent.style.visibility = 'visible';
                }
            }
            if (overlay) {
                overlay.style.opacity = `${data.progress * 0.5}`;
            }
            if (container) {
                container.style.transform = `translate(${(1 - data.easing) * 100}%, 0)`;
            }
        });

        // subscribe to store
        const listener = store.subscribe(() => {
            const state = store.getState().popupMenu;
            const toShow = state.shown;
            // prevent underneath scrolling
            app.html.classList.toggle(styles.prevent_scroll, toShow);
            // animate the parent element
            if (toShow) {
                timeline.play();
            } else {
                timeline.reverse();
            }
            // set focus
            if (toShow) {
                focusElement = document.activeElement;
                setTimeout(() => {
                    if (closeButtonRef.current) {
                        closeButtonRef.current.focus();
                    }
                }, 250);
            } else if (!toShow) {
                if (focusElement instanceof HTMLElement) {
                    focusElement.focus();
                }
            }
        });

        // router callbacks
        const routerEvent = routerCallbacks.add('before', () => {
            store.dispatch({
                type: 'hidePopupMenu',
            });
        });

        return () => {
            listener();
            timeline.destroy();
            routerEvent.remove();
        };
    }, []);

    return (
        <div
            ref={parentRef}
            className={styles.popup_menu}
            aria-hidden
        >
            <div
                ref={overlayRef}
                className={styles.popup_menu__overlay}
            />
            <div
                ref={containerRef}
                className={styles.popup_menu__container}
            >

                <button
                    type="button"
                    className={styles.popup_menu__close}
                    ref={closeButtonRef}
                    onClick={() => {
                        store.dispatch({
                            type: 'hidePopupMenu',
                        });
                    }}
                >
                    <span>{lexicon.hideMenu}</span>
                </button>

                <div className={styles.popup_menu__wrap}>

                    {/* site menu */}
                    <ul className={styles.popup_menu__site_menu}>
                        {siteMenu.map((link) => (
                            <li
                                key={link.id}
                            >
                                <Link href={link.href}>
                                    <a
                                        href={link.href}
                                        className={link.isActive ? styles.active : ''}
                                        target={link.isExternal ? '_blank' : ''}
                                        rel="noreferrer"
                                    >
                                        {link.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* catalog menu */}
                    <div className={styles.popup_menu__languages}>
                        <LanguagesList languages={languages} />
                    </div>

                </div>
            </div>
        </div>
    );
};
export default PopupMenu;
