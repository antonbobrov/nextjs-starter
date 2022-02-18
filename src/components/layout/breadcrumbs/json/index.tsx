import { FC } from 'react';
import normalizers from '@/utils/normalizers';
import { useSelector } from 'react-redux';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import { selectConfig } from '@/store/reducers/config';

const LayoutBreadCrumbsJSON: FC = () => {
    const globalProps = useSelector(selectPagePropsGlobal);
    const { breadcrumbs } = globalProps;
    const configProps = useSelector(selectConfig);
    const { url } = configProps;

    if (!breadcrumbs || breadcrumbs.length === 0) {
        return <></>;
    }

    const json = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [] as any[],
    };
    breadcrumbs.forEach((item, index) => {
        if (index < breadcrumbs.length - 1) {
            json.itemListElement.push({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: normalizers.urlSlashes(`${url.base}/${item.href}`),
            });
        } else {
            json.itemListElement.push({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
            });
        }
    });

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    );
};

export default LayoutBreadCrumbsJSON;
