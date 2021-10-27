import { FC } from 'react';
import Link from 'next/link';
import PageContext from '../../../store/PageContext';
import styles from './styles.module.scss';

const BreadCrumbs: FC = () => (
    <PageContext.Consumer>
        {({
            breadcrumbs,
        }) => {
            if (breadcrumbs.length === 0) {
                return <></>;
            }
            return (
                <nav
                    className={styles.breadcrumbs}
                    aria-label="Breadcrumb"
                >
                    <ul
                        itemScope
                        itemType="https://schema.org/BreadcrumbList"
                    >
                        {breadcrumbs.map((item, index) => (
                            <li
                                className={(index === breadcrumbs.length - 1) ? styles.active : ''}
                                key={item.id}
                                itemProp="itemListElement"
                                itemScope
                                itemType="https://schema.org/ListItem"
                            >
                                {index === breadcrumbs.length - 1
                                    ? <span itemProp="name" aria-current="page">{item.name}</span>
                                    : (
                                        <Link href={item.href}>
                                            <a
                                                itemScope
                                                itemType="https://schema.org/WebPage"
                                                itemProp="item"
                                                itemID={item.href}
                                                href={item.href}
                                            >
                                                <span itemProp="name">{item.name}</span>
                                            </a>
                                        </Link>
                                    ) }
                                <meta itemProp="position" content={`${index + 1}`} />
                            </li>
                        ))}
                    </ul>
                </nav>
            );
        }}

    </PageContext.Consumer>
);

export default BreadCrumbs;
