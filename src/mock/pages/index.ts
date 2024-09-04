import { TGetMockPage } from './types';

export const GET_MOCK_PAGE_INDEX: TGetMockPage = () => ({
  templateName: 'Home',

  meta: {
    pagetitle: 'Home',
    description: 'Home description',
    keywords: 'Home keywords',
    image: '/mock/image.jpg',
    searchable: true,
    swr: true,
  },

  breadcrumbs: [{ id: 0, href: '/', name: 'Home' }],

  components: [
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
            href: 'components',
            isExternal: false,
          },
          children: null as any,
        },
      ],
    },

    {
      key: 0,
      componentName: 'HomeIntro',
      props: {
        title: 'Home Page',
        description: `Last rendered time: ${new Date()}`,
      },
      children: null as any,
    },
  ],
});
