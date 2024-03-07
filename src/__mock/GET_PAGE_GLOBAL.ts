import { DeepRequired } from 'ts-essentials';
import { IPageGlobal } from '@/types/Page';
import { TPageTemplateRegistryAPI } from '@/templates/Renderer';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';

interface IProps {
  templateName: TPageTemplateRegistryAPI['templateName'];
  path: string;
}

export const MOCK_GET_PAGE_GLOBAL = ({
  templateName,
  path,
}: IProps): DeepRequired<IPageGlobal> => ({
  lang: 'en',
  dir: 'ltr',

  meta: {
    pagetitle: 'Next.js Starter',
    description: '',
    keywords: '',
    image: '',
    searchable: true,
    swr: true,
  },

  links: {
    home: '/',
  },

  languages: [
    {
      key: 'en',
      name: 'En',
      fullName: 'English',
      href: removeDublicateSlashes(`${path}-en`),
      isActive: true,
    },
    {
      key: 'de',
      name: 'De',
      fullName: 'Deutsch',
      href: removeDublicateSlashes(`${path}-de`),
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
    {
      key: 1,
      name: '404',
      href: '/404',
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
});
