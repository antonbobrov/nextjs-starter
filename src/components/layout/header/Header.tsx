import { ITemplateBase } from '../../../templates/placeholder';
import styles from './Header.module.scss';

const Header = ({
    url,
    siteName,
}: ITemplateBase) => (
    <header
        className={styles.header}
    >
        <a
            href={url.siteUrl}
            className={styles.header__logo}
        >
            {siteName}
        </a>
        <nav className={styles.header__menu}>
            <ul>
                <li>
                    <a href="/">Home page</a>
                </li>
                <li>
                    <a href="/text-page">Text page</a>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
