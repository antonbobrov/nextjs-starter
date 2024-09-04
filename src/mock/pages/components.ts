import { TGetMockPage } from './types';

export const GET_MOCK_PAGE_COMPONENTS: TGetMockPage = () => ({
  templateName: 'Components',

  meta: {
    pagetitle: 'Components',
    description: '',
    keywords: '',
    image: '',
    searchable: true,
    swr: true,
  },

  breadcrumbs: [
    { id: 0, href: '/', name: 'Home' },
    { id: 1, href: '/components', name: 'Components' },
  ],
});
