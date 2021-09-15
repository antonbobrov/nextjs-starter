import Link from 'next/link';
import { FC } from 'react';
import { TemplateBaseData } from '../../../templates/_base/types';
import getLexiconValue from '../../../utils/document/getLexiconValue';
import styles from './Header.module.scss';

const Header: FC<TemplateBaseData> = ({
    url,
    lexicon,
}) => (
    <header
        className={styles.header}
    >
        {/* Logo */}
        <Link href={url.siteUrl}>
            <a
                href={url.siteUrl}
                className={styles.header__logo}
            >
                {getLexiconValue('siteName', lexicon)}
            </a>
        </Link>

        {/* Menu Nav */}
        <nav className={styles.header__menu}>
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
