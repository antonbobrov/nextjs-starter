import Link from 'next/link';
import {
    FC, useContext, useEffect, useRef,
} from 'react';
import { selectAll } from 'vevet-dom';
import app from '../../../app';
import PageContext from '../../../store/PageContext';
import { store } from '../../../store/store';
import LanguagesSelect from '../languages/select';
import styles from './styles.module.scss';

interface Data {
    isFixed: boolean;
}

const Header: FC<Data> = (
    props,
) => {
    const pageProps = useContext(PageContext);
    const {
        lexicon, globalLinks, siteMenu, languages,
    } = pageProps;
    const parentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const parent = parentRef.current;
        if (!!parent && props.isFixed) {
            app.onPageLoaded().then(() => {
                const children = selectAll('*', parent);
                children.forEach((child) => {
                    child.setAttribute('aria-hidden', 'true');
                    child.setAttribute('tabindex', '-1');
                });
            });
        }
    }, [parentRef]);

    return (

        <header
            ref={parentRef}
            className={[
                styles.header,
                props.isFixed ? `${styles.is_fixed} fixed_header` : 'static_header',
            ].join(' ')}
        >

            {/* logo */}
            <Link href={globalLinks.home}>
                <a
                    href={globalLinks.home}
                    className={styles.header__logo}
                >
                    {lexicon.siteName}
                </a>
            </Link>

            {/* menu nav */}
            <nav className={styles.header__menu}>
                <ul>
                    {siteMenu.map((link) => (
                        <li key={link.id}>
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
            </nav>

            {/* languages */}
            <nav className={styles.header__languages}>
                <LanguagesSelect
                    languages={languages}
                />
            </nav>

            {/* popup menu */}
            <button
                type="button"
                className={styles.header__popup_menu}
                onClick={() => {
                    store.dispatch({
                        type: 'showPopupMenu',
                    });
                }}
            >
                <span>{lexicon.showMenu}</span>
            </button>

        </header>
    );
};

export default Header;
