import { DeepRequired } from 'ts-essentials';
import { IPageGlobal } from '@/types/Page';

export const PAGE_GLOBAL: DeepRequired<IPageGlobal> = {
  lang: 'en',
  dir: 'ltr',

  meta: {
    pagetitle: 'Next.js Starter',
    description: '',
    keywords: '',
    image: '',
    searchable: true,
  },

  links: {
    home: '/',
  },

  languages: [
    { key: 'en', name: 'En', fullName: 'English', href: '/', isActive: true },
    {
      key: 'de',
      name: 'De',
      fullName: 'Deutsch',
      href: '/',
      isActive: false,
    },
  ],

  menu: [
    {
      key: 0,
      name: 'Home',
      href: '/',
      isActive: true,
    },
    {
      key: 1,
      name: 'Components',
      href: '/_components',
      isActive: false,
    },
  ],

  breadcrumbs: [{ id: 0, href: '/', name: 'Home' }],

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
};
