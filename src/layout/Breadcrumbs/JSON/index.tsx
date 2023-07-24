import { FC } from 'react';
import { useStoreConfig } from '@/store/reducers/config';
import { useStoreGlobalProps } from '@/store/reducers/pageProps';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';

export const BreadcrumbsJSON: FC = () => {
  const { breadcrumbs } = useStoreGlobalProps();
  const { url } = useStoreConfig();

  if (!breadcrumbs || !breadcrumbs.length) {
    return null;
  }

  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(({ name, href }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: removeDublicateSlashes(new URL(href, url.base).href),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};
