import Link from 'next/link';
import PageContext from '../../../store/pageContext';
import styles from './styles.module.scss';

const Header = () => (
    <PageContext.Consumer>
        {(props) => {
            const { url, lexicon, headerMenu } = props;
            return (
                <header
                    className={styles.header}
                >
                    {/* Logo */}
                    <Link href={url.siteUrl}>
                        <a
                            href={url.siteUrl}
                            className={styles.header__logo}
                        >
                            {lexicon.siteName}
                        </a>
                    </Link>

                    {/* Menu Nav */}
                    <nav className={styles.header__menu}>
                        <ul>
                            {headerMenu.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href}>
                                        <a
                                            href={link.href}
                                            className={link.isActive ? 'active' : ''}
                                        >
                                            {link.name}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </header>
            );
        }}
    </PageContext.Consumer>
);

export default Header;
