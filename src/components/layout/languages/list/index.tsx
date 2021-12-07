import {
    FC, useEffect, useState,
} from 'react';
import Link from 'next/link';
import { LanguagesData } from '@/types/page';
import styles from './styles.module.scss';

interface Data {
    languages: LanguagesData[];
}

const LayoutLanguagesList: FC<Data> = ({
    languages,
}) => {
    const [languagesList, setLanguagesList] = useState(languages);
    useEffect(() => {
        setLanguagesList(languages);
    }, [languages]);


    return (
        <ul
            className={styles.layout_languages_list}
        >
            {languagesList.map((item) => (
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
