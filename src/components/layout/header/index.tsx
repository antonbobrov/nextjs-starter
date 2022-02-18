import Link from 'next/link';
import { useRef, VFC } from 'react';
import { selectAll } from 'vevet-dom';
import { useSelector } from 'react-redux';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import { useOnPageLoadedHook } from '@/utils/hooks/vevet';
import { selectLexicon } from '@/store/reducers/lexicon';
import styles from './styles.module.scss';
import LayoutLanguagesSelect from '../languages/select';
import LayoutMenuButton from '../menu/button';

interface Props {
    isFixed: boolean;
}

const LayoutHeader: VFC<Props> = ({
    isFixed,
}) => {
    const globalProps = useSelector(selectPagePropsGlobal);
    const { globalLinks, siteMenu } = globalProps;
    const lexicon = useSelector(selectLexicon);
    const parentRef = useRef<HTMLElement>(null);

    useOnPageLoadedHook(() => {
        const parent = parentRef.current;
        if (!parent || !isFixed) {
            return;
        }
        const children = selectAll('*', parent);
        children.forEach((child) => {
            child.setAttribute('aria-hidden', 'true');
            child.setAttribute('tabindex', '-1');
        });
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
                <LayoutLanguagesSelect />
            </nav>

            {/* popup menu */}
            <div className={styles.menu_button}>
                <LayoutMenuButton isActive={false} />
            </div>

        </header>
    );
};

export default LayoutHeader;
