import { TTemplate } from '@/templates/types';
import { ILexicon } from '@/lexicon/types';
import { IPageGlobal } from './Page';

/** Page url data */
export interface IPageApiURL {
  base: string;
  canonical: string;
}

/** Page props for API */
export interface IPageApi {
  global: IPageGlobal;
  lexicon: ILexicon;
  url: IPageApiURL;
  template?: TTemplate;
}

/** Page fetching props */
export interface IPageApiFetchProps {
  path: string;
  locale?: string;
}

/** Page props in `_app` */
export type TAppPage = { page: IPageApi };
