import Link from 'next/link';
import PageContext from '../../../store/pageContext';
import styles from './styles.module.scss';

const Header = () => (
    <PageContext.Consumer>
        {(props) => {
            const { url, lexicon } = props;
            return (
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
        }}
    </PageContext.Consumer>
);

export default Header;
