import { DeepRequired } from 'ts-essentials';
import { IPageGlobal } from '@/types/Page';
import { TPageTemplateRegistryAPI } from '@/templates/Renderer';
import { NextApiRequest } from 'next';

interface IProps {
  req: NextApiRequest;
  templateName: TPageTemplateRegistryAPI['templateName'];
}

export const GET_PAGE_GLOBAL = ({
  templateName,
}: IProps): DeepRequired<IPageGlobal> => ({
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
    { key: 'en', name: 'En', fullName: 'English', href: '/en', isActive: true },
    {
      key: 'de',
      name: 'De',
      fullName: 'Deutsch',
      href: '/de',
      isActive: false,
    },
  ],

  menu: [
    {
      key: 0,
      name: 'Home',
      href: '/',
      isActive: templateName === 'Home',
    },
    {
      key: 1,
      name: 'Components',
      href: '/_components',
      isActive: templateName === '_LoremComponents',
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
});
