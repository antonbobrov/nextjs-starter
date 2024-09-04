import { TBreadcrumbs } from '@/components/layout/Breadcrumbs/types';
import { ILink, ILinkMenu, ILinksLanguage } from './Link';

/** Page global links */
export interface IPageGlobalLinks {
  home: string;
}

/** Global page props */
export interface IPageGlobal {
  lang: string;
  links: IPageGlobalLinks;
  languages: ILinksLanguage[];
  menu: ILinkMenu[];
  social: ILink[];
}

/** Page meta data */
export interface IPageMeta {
  pagetitle: string;
  description?: string;
  keywords?: string;
  image?: string;
  searchable?: boolean;
  swr?: number | boolean;
}

/** Page base props */
export interface IPageBase {
  meta: IPageMeta;
  breadcrumbs?: TBreadcrumbs;
}
