import dynamic from 'next/dynamic';
import { FC } from 'react';
import { TTemplate } from '../types';

const NotFound = dynamic(() => import('../NotFound'), {
  ssr: true,
});

const Home = dynamic(() => import('../Home'), {
  ssr: true,
});

const Components = dynamic(() => import('../Components'), {
  ssr: true,
});

const Empty = dynamic(() => import('../_Empty'), {
  ssr: true,
});

export const TemplateRenderer: FC<TTemplate> = (props) => {
  const { templateName } = props;

  switch (templateName) {
    case 'Home':
      return <Home {...props} />;

    case 'NotFound':
      return <NotFound {...props} />;

    case 'Components':
      return <Components {...props} />;

    default:
      return <Empty />;
  }
};
