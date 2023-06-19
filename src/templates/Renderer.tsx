import { useStoreConfig } from '@/store/reducers/config';
import { useStorePageProps } from '@/store/reducers/pageProps';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useTemplateLayoutStates } from './_hooks/useTemplateLayoutStates';

const Empty = dynamic(() => import('./Empty'), {
  ssr: true,
});
const Components = dynamic(() => import('./_components'), {
  ssr: true,
});
const NotFound = dynamic(() => import('./NotFound'), {
  ssr: true,
});
const Home = dynamic(() => import('./Home'), {
  ssr: true,
});

export const TemplateRenderer: FC = () => {
  const { template, templateName } = useStorePageProps();
  const { key } = useStoreConfig();

  const templateProps = template as any;

  useTemplateLayoutStates(key);

  switch (templateName) {
    case '_components':
      return <Components key={key} {...templateProps} />;
    case 'not-found':
      return <NotFound key={key} {...templateProps} />;
    case 'home':
      return <Home key={key} {...templateProps} />;
    default:
      return <Empty key={key} {...templateProps} />;
  }
};
