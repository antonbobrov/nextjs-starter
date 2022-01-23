import { Timeline } from 'vevet';
import { useEffect, useRef, VFC } from 'react';
import Link from 'next/link';
import routerCallbacks from 'src/router';
import { addEventListener } from 'vevet-dom';
import app from 'src/app';
import store from '@/store/store';
import { useSelector } from 'react-redux';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import styles from './styles.module.scss';
import LayoutMenuButton from '../button';
import LayoutLanguagesList from '../../languages/list';

const duration = 450;

const LayoutMenuPopup: VFC = () => {
    const { siteMenu } = useSelector(selectPagePropsGlobal);

    let focusElement: Element | null = null;
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
            if (e.keyCode === 27 && store.getState().layout.popupMenuShown) {
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
            const state = store.getState().layout.popupMenuShown;
            // prevent underneath scrolling
            app.html.classList.toggle(styles.prevent_scroll, state);
            // animate the parent element
            if (state) {
                timeline.play();
            } else {
                timeline.reverse();
            }
            // set focus
            if (state) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                focusElement = document.activeElement;
                setTimeout(() => {
                    if (closeButtonRef.current) {
                        closeButtonRef.current.focus();
                    }
                }, 250);
            } else if (!state) {
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
                                    >
                                        {link.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* catalog menu */}
                    <div className={styles.languages}>
                        <LayoutLanguagesList />
                    </div>

                </div>
            </div>
        </div>
    );
};
export default LayoutMenuPopup;
