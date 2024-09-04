import getLexicon from '@/lexicon/getLexicon';
import { IPageApiFetchProps } from '@/types/PageApi';
import { IPageGlobal } from '@/types/Page';
import { getBaseURL } from '../../helpers/getBaseUrl';

export function getDynamicData(
  global: IPageGlobal,
  { path, locale: localeProp }: IPageApiFetchProps,
) {
  const baseUrl = getBaseURL();

  const locale = !localeProp || localeProp === 'default' ? '' : localeProp;
  const fillPath = `${locale}${path}`.replace(/([^:]\/)\/+/g, '$1');

  const canonicalUrl = new URL(fillPath, baseUrl).href;

  return {
    lexicon: getLexicon(global.lang),
    url: {
      base: baseUrl,
      canonical: canonicalUrl,
    },
  };
}
