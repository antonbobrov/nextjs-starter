import { IPageConfig } from '@/types/Page';
import { getHost } from '@/utils/url/getHost';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';
import { GetServerSidePropsContext } from 'next';

export function getSSPPageConfig(
  context: GetServerSidePropsContext
): IPageConfig {
  const { resolvedUrl } = context;
  const time = +new Date();

  const baseUrl = getHost(context.req);
  const currentUrl = removeDublicateSlashes(`${baseUrl}/${resolvedUrl}`);

  const currentUrlData = new URL(currentUrl);

  const canonicalUrl = removeDublicateSlashes(
    `${currentUrlData.origin}/${currentUrlData.pathname}`
  );

  return {
    key: time,
    url: {
      base: baseUrl,
      url: currentUrl,
      canonical: canonicalUrl,
    },
  };
}
