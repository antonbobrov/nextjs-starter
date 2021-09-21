import Link from 'next/link';
import { FC } from 'react';
import { BaseTemplateData } from '../../../types/page';
import styles from './styles.module.scss';

const Header: FC<BaseTemplateData> = ({
    url,
    lexicon,
}) => (
    <header
        className={styles.container}
    >
        {/* Logo */}
        <Link href={url.siteUrl}>
            <a
                href={url.siteUrl}
                className={styles.container__logo}
            >
                {lexicon.siteName}
            </a>
        </Link>

        {/* Menu Nav */}
        <nav className={styles.container__menu}>
            <ul>
                <li>
                    <Link href="/">Home page</Link>
                </li>
                <li>
                    <Link href="/text-page">Text page</Link>
                </li>
                <li>
                    <Link href="/examples">Examples</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
