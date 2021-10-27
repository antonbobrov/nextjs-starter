import {
    FC, useEffect, useRef, useState,
} from 'react';
import Link from 'next/link';
import { addEventListener, childOf } from 'vevet-dom';
import { LanguagesData } from '../../../../types/page';
import styles from './styles.module.scss';

interface Data {
    languages: LanguagesData[];
}

const LanguagesSelect: FC<Data> = (props) => {
    const [languages, setLanguages] = useState(props.languages.filter((item) => !item.isActive));
    const [selectedLanguage, setSelectedLanguage] = useState(
        props.languages.find((item) => item.isActive),
    );
    const [isExpanded, setIsExpanded] = useState(false);

    const outerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLanguages(props.languages.filter((item) => !item.isActive));
        setSelectedLanguage(props.languages.find((item) => item.isActive));
    }, [props]);

    useEffect(() => {
        const outsideClick = addEventListener(window, 'click', (e) => {
            if (outerRef.current) {
                if (!childOf(e.target as Element, outerRef.current)) {
                    setIsExpanded(false);
                }
            }
        });
        return () => {
            outsideClick.remove();
        };
    }, [outerRef]);


    return (
        <div
            className={styles.languages_select}
            ref={outerRef}
        >
            <div
                className={`${styles.languages_select__thumb} ${(isExpanded ? styles.expanded : '')}`}
                onClick={() => {
                    setIsExpanded(!isExpanded);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        setIsExpanded(!isExpanded);
                    } else if (e.keyCode === 27) {
                        setIsExpanded(false);
                    }
                }}
                role="button"
                aria-label={`${selectedLanguage ? `${selectedLanguage.fullName},` : ''} Select your language`}
                aria-expanded={isExpanded}
                tabIndex={0}
            >
                <span aria-hidden="true">{selectedLanguage ? <span>{selectedLanguage.name}</span> : ''}</span>
            </div>
            <ul
                role="listbox"
                aria-expanded={isExpanded}
                className={`${styles.languages_select__ul} ${(isExpanded ? styles.expanded : '')}`}
            >
                {languages.map((item, index) => (
                    <li
                        key={item.key}
                        className={[
                            styles.languages_select__li,
                            selectedLanguage === item ? styles.active : '',
                            isExpanded ? styles.show : '',
                        ].join(' ')}
                        style={{
                            transitionDelay: isExpanded ? `${index * 0.1}s` : '0s',
                        }}
                    >
                        <Link href={item.href}>
                            <a
                                href={item.href}
                                aria-label={item.fullName}
                                role="option"
                                aria-selected={selectedLanguage === item}
                                hrefLang={item.key}
                                className={selectedLanguage === item ? styles.active : ''}
                            >
                                <span aria-hidden="true">{item.name}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default LanguagesSelect;
