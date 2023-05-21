import { TBreadcrumbs } from '@/layout/Breadcrumbs/types';
import { ILexicon } from '@/lexicon/types';
import { ILink, ILinkMenu, ILinksLanguage } from './Link';

/**
 * Global page props
 */
export interface IPageGlobal {
  lang: string;
  dir: 'ltr' | 'rtl';
  meta?: {
    pagetitle: string;
    description?: string;
    keywords?: string;
    image?: string;
    searchable: boolean;
  };
  links: {
    home: string;
  };
  languages?: ILinksLanguage[];
  menu?: ILinkMenu[];
  breadcrumbs?: TBreadcrumbs;
  social: ILink[];
}

/**
 * Automatically server-side generated props
 */
export interface IPageConfig {
  key: number;
  url: {
    base: string;
    url: string;
    canonical: string;
  };
}

/**
 * Page props
 */
export interface IPage<T extends Record<string, any> = {}> {
  global: IPageGlobal;
  templateName: string;
  template: T;
}

/**
 * Page APP Props
 */
export interface IAppPage {
  page?: {
    props: IPage;
    config: IPageConfig;
    lexicon: ILexicon;
  };
  error?: {
    name?: string;
    body?: string;
  };
}
