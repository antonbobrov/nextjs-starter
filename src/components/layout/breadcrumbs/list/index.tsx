import Link from 'next/link';
import { useSelector } from 'react-redux';
import { VFC } from 'react';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import styles from './styles.module.scss';

const LayoutBreadCrumbsList: VFC = () => {
    const globalProps = useSelector(selectPagePropsGlobal);
    const { breadcrumbs } = globalProps;

    if (!breadcrumbs || breadcrumbs.length === 0) {
        return <></>;
    }

    return (
        <nav
            className={styles.layout_breadcrumbs}
            aria-label="Breadcrumb"
        >
            <ul>
                {breadcrumbs.map((item, index) => (
                    <li
                        className={(index === breadcrumbs.length - 1) ? styles.active : ''}
                        key={item.id}
                    >
                        {index === breadcrumbs.length - 1
                            ? <span>{item.name}</span>
                            : (
                                <Link href={item.href}>
                                    <a href={item.href}>
                                        <span>{item.name}</span>
                                    </a>
                                </Link>
                            ) }
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default LayoutBreadCrumbsList;
