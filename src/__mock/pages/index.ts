import { TPageTemplateRegistryAPI } from '@/templates/Renderer';
import { MOCK_GET_PAGE_GLOBAL } from '../GET_PAGE_GLOBAL';

export function MOCK_PAGES_HOME(path: string): TPageTemplateRegistryAPI {
  const PAGE_GLOBAL = MOCK_GET_PAGE_GLOBAL({
    templateName: 'Home',
    path,
  });

  return {
    global: PAGE_GLOBAL,

    templateName: 'Home',

    template: {
      components: [
        {
          key: 0,
          componentName: 'HomeIntro',
          props: {
            title: 'Home Page',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
          children: null,
        },
        {
          key: 1,
          componentName: 'HomeAbout',
          props: {
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
          children: [
            {
              key: 0,
              componentName: 'HomeLink',
              props: {
                name: 'Read more',
                href: 'https://google.com',
                isExternal: true,
              },
              children: null,
            },
          ],
        },
      ],
    },
  };
}
