import { TGetMockPage } from './types';

export const GET_MOCK_PAGE_SLUG: TGetMockPage = () => ({
  templateName: 'NotFound',

  meta: {
    pagetitle: 'Page Not Found',
    description: '',
    keywords: '',
    image: '',
    searchable: false,
    swr: false,
  },

  breadcrumbs: [
    { id: 0, href: '/', name: 'Home' },
    { id: 1, href: '/not-found', name: 'Page Not Found' },
  ],
});
