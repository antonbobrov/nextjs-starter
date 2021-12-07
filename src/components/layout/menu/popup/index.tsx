import { Timeline } from 'vevet';
import {
    useContext, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import routerCallbacks from 'src/router';
import { addEventListener } from 'vevet-dom';
import app from 'src/app';
import PageContext from '@/store/PageContext';
import store from '@/store/store';
import styles from './styles.module.scss';
import LayoutMenuButton from '../button';
import LayoutLanguagesList from '../../languages/list';

const duration = 450;

const LayoutPopupMenu = () => {
    const pageProps = useContext(PageContext);
    let focusElement: Element | null = null;
    const { siteMenu, languages } = pageProps;
    const parentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // global events
    useEffect(() => {
        // hide menu on route change
        const routerEvent = routerCallbacks.add('before', () => {
            store.dispatch({
                type: 'HIDE_POPUP_MENU',
            });
        });
        // hide menu on escape
        const escapeListener = addEventListener(window, 'keydown', (e) => {
            if (e.keyCode === 27 && store.getState().popupMenu.shown) {
                store.dispatch({
                    type: 'HIDE_POPUP_MENU',
                });
            }
        });
        return () => {
            routerEvent.remove();
            escapeListener.remove();
        };
    }, []);



    // menu handler
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
        const storeListener = store.subscribe(() => {
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
            if (state.shown) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                focusElement = document.activeElement;
                setTimeout(() => {
                    if (closeButtonRef.current) {
                        closeButtonRef.current.focus();
                    }
                }, 250);
            } else if (!state.shown) {
                if (focusElement instanceof HTMLElement) {
                    focusElement.focus();
                }
            }
        });

        return () => {
            storeListener();
            timeline.destroy();
        };
    }, []);

    return (
        <div
            ref={parentRef}
            className={styles.layout_menu_popup}
            aria-hidden
        >
            <div
                ref={overlayRef}
                data-overlay
                className={styles.overlay}
                onClick={() => {
                    store.dispatch({
                        type: 'HIDE_POPUP_MENU',
                    });
                }}
                aria-hidden
            />
            <div
                ref={containerRef}
                className={styles.container}
            >

                <div className={styles.close}>
                    <LayoutMenuButton isActive />
                </div>

                <div className={styles.wrap}>

                    {/* site menu */}
                    <ul className={styles.site_menu}>
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
                    <div className={styles.languages}>
                        <LayoutLanguagesList languages={languages} />
                    </div>

                </div>
            </div>
        </div>
    );
};
export default LayoutPopupMenu;