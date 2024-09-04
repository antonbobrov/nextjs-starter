import { FC, memo } from 'react';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';
import { usePageTemplate, usePageUrl } from '@/store/page/hooks';

const Component: FC = () => {
  const url = usePageUrl();
  const template = usePageTemplate();

  const breadcrumbs = template?.breadcrumbs;

  if (!breadcrumbs || breadcrumbs.length === 0) {
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

Component.displayName = 'BreadcrumbsJSON';

export const BreadcrumbsJSON = memo(Component);
