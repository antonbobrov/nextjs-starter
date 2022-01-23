import Link from 'next/link';
import { useSelector } from 'react-redux';
import { VFC } from 'react';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import styles from './styles.module.scss';

const LayoutLanguagesList: VFC = () => {
    const { languages } = useSelector(selectPagePropsGlobal);

    return (
        <ul
            className={styles.layout_languages_list}
        >
            {languages.map((item) => (
                <li
                    key={item.key}
                    className={[
                        styles.li,
                        item.isActive ? styles.active : '',
                    ].join(' ')}
                >
                    <Link href={item.href}>
                        <a
                            href={item.href}
                            aria-label={item.fullName}
                            hrefLang={item.key}
                            className={item.isActive ? styles.active : ''}
                        >
                            <span aria-hidden="true">{item.name}</span>
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
export default LayoutLanguagesList;
