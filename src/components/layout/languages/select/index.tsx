import {
    useEffect, useRef, useState, VFC,
} from 'react';
import Link from 'next/link';
import { addEventListener, childOf } from 'vevet-dom';
import { useSelector } from 'react-redux';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import styles from './styles.module.scss';

const LayoutLanguagesSelect: VFC = () => {
    const { languages } = useSelector(selectPagePropsGlobal);

    const [languagesList, setLanguagesList] = useState(
        languages.filter((item) => !item.isActive),
    );
    const [selectedLanguage, setSelectedLanguage] = useState(
        languages.find((item) => item.isActive),
    );
    const [isExpanded, setIsExpanded] = useState(false);

    const outerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLanguagesList(languages.filter((item) => !item.isActive));
        setSelectedLanguage(languages.find((item) => item.isActive));
    }, [languages]);

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
            className={styles.layout_languages_select}
            ref={outerRef}
        >
            <div
                className={[
                    styles.thumb,
                    isExpanded ? styles.expanded : '',
                ].join(' ')}
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
                className={[
                    styles.ul,
                    isExpanded ? styles.expanded : '',
                ].join(' ')}
            >
                {languagesList.map((item, index) => (
                    <li
                        key={item.key}
                        className={[
                            styles.li,
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
export default LayoutLanguagesSelect;
