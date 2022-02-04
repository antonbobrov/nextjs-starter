import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPagePropsConfig, selectPagePropsGlobal } from '@/store/reducers/pageProps';
import { normalizeRepeatedSlashes } from 'next/dist/shared/lib/utils';

const LayoutBreadCrumbsJSON: FC = () => {
    const globalProps = useSelector(selectPagePropsGlobal);
    const { breadcrumbs } = globalProps;
    const configProps = useSelector(selectPagePropsConfig);
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
                item: normalizeRepeatedSlashes(`${url.base}/${item.href}`),
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
