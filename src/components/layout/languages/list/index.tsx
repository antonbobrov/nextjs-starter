import {
    FC, useEffect, useState,
} from 'react';
import Link from 'next/link';
import { LanguagesData } from '../../../../types/page';
import styles from './styles.module.scss';

interface Data {
    languages: LanguagesData[];
}

const LanguagesList: FC<Data> = (props) => {
    const [languages, setLanguages] = useState(props.languages);
    useEffect(() => {
        setLanguages(props.languages);
    }, [props]);


    return (
        <ul
            className={styles.languages_list}
        >
            {languages.map((item) => (
                <li
                    key={item.key}
                    className={[
                        styles.languages_list__li,
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
export default LanguagesList;
