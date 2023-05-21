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
    itemListElement: breadcrumbs.map(({ name, href }, index) => {
      if (index < breadcrumbs.length - 1) {
        return {
          '@type': 'ListItem',
          position: index + 1,
          name,
          item: removeDublicateSlashes(`${url.base}/${href}`),
        };
      }

      return {
        '@type': 'ListItem',
        position: index + 1,
        name,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};
