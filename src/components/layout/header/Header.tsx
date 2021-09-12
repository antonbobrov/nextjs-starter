import { TemplateBaseData } from '../../../templates/_base/types';
import getLexiconValue from '../../../utils/document/getLexiconValue';
import styles from './Header.module.scss';

const Header = ({
    url,
    lexicon,
}: TemplateBaseData) => (
    <header
        className={styles.header}
    >
        <a
            href={url.siteUrl}
            className={styles.header__logo}
        >
            {getLexiconValue('siteName', lexicon)}
        </a>
        <nav className={styles.header__menu}>
            <ul>
                <li>
                    <a href="/">Home page</a>
                </li>
                <li>
                    <a href="/text-page">Text page</a>
                </li>
                <li>
                    <a href="/examples">Examples</a>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
