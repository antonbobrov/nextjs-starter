import { IPageGlobal } from '@/types/Page';
import { IPageApiFetchProps } from '@/types/PageApi';
import { DeepRequired } from 'ts-essentials';

export const GET_MOCK_GLOBAL = ({
  path,
}: IPageApiFetchProps): DeepRequired<IPageGlobal> => ({
  lang: 'en',

  links: {
    home: '/',
  },

  languages: [
    {
      key: 'en',
      name: 'En',
      fullName: 'English',
      href: `/en?page=${path}`,
      isActive: true,
    },
    {
      key: 'de',
      name: 'De',
      fullName: 'Deutsch',
      href: `/de?page=${path}`,
      isActive: false,
    },
  ],

  menu: [
    {
      key: 0,
      name: 'Home',
      href: '/',
      isActive: path === '/',
    },
    {
      key: 1,
      name: 'Components',
      href: '/components',
      isActive: path === '/components',
    },
    {
      key: 2,
      name: 'Custom',
      href: '/custom',
      isActive: path === '/custom',
    },
    {
      key: 3,
      name: '404',
      href: '/404',
      isActive: false,
    },
  ],

  social: [
    {
      key: 0,
      name: 'Facebook',
      href: 'https://fb.com/',
    },
    {
      key: 1,
      name: 'Instagram',
      href: 'https://instagram.com/',
    },
  ],
});
