import Link from 'next/link';
import {
    FC, useEffect, useRef,
} from 'react';
import app from 'src/app';
import { selectAll } from 'vevet-dom';
import { useSelector } from 'react-redux';
import { selectStorePageProps } from '@/store/reducers/page';
import styles from './styles.module.scss';
import LayoutLanguagesSelect from '../languages/select';
import LayoutMenuButton from '../menu/button';

interface Props {
    isFixed: boolean;
}

const LayoutHeader: FC<Props> = ({
    isFixed,
}) => {
    const pageProps = useSelector(selectStorePageProps);
    const {
        lexicon, globalLinks, siteMenu, languages,
    } = pageProps;
    const parentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const parent = parentRef.current;
        if (!!parent && isFixed) {
            app.onPageLoaded().then(() => {
                const children = selectAll('*', parent);
                children.forEach((child) => {
                    child.setAttribute('aria-hidden', 'true');
                    child.setAttribute('tabindex', '-1');
                });
            });
        }
    }, [parentRef, isFixed]);

    return (

        <header
            ref={parentRef}
            className={[
                styles.layout_header,
                isFixed ? `${styles.is_fixed} fixed_header` : 'static_header',
            ].join(' ')}
        >

            {/* logo */}
            <Link href={globalLinks.home}>
                <a
                    href={globalLinks.home}
                    className={styles.logo}
                >
                    {lexicon.siteName}
                </a>
            </Link>

            {/* menu nav */}
            <nav className={styles.menu}>
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
            <nav className={styles.languages}>
                <LayoutLanguagesSelect
                    languages={languages}
                />
            </nav>

            {/* popup menu */}
            <div className={styles.menu_button}>
                <LayoutMenuButton isActive={false} />
            </div>

        </header>
    );
};

export default LayoutHeader;
