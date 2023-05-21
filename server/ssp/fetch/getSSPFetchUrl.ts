import { getHost } from '@/utils/url/getHost';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';
import { GetServerSidePropsContext } from 'next';

export function getSSPFetchUrl(context: GetServerSidePropsContext): URL {
  const { resolvedUrl, req } = context;

  let apiURL: URL;

  if (process.env.NEXT_PUBLIC_API_PAGE) {
    apiURL = new URL(
      removeDublicateSlashes(
        `${process.env.NEXT_PUBLIC_API_PAGE}/${resolvedUrl}`
      )
    );
  } else {
    apiURL = new URL(
      removeDublicateSlashes(`${getHost(req)}/api/mock/page/${resolvedUrl}`)
    );
  }

  apiURL.searchParams.delete('slug');

  return apiURL;
}
