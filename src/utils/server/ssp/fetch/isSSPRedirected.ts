import { getHost } from '@/utils/url/getHost';
import { GetServerSidePropsContext, Redirect } from 'next';

export function isSSPRedirected(
  context: GetServerSidePropsContext,
  response: Response
): Redirect | null {
  const { req, resolvedUrl } = context;

  const isRedirected = !/\.(.*)$/.test(resolvedUrl) && response.redirected;
  const responseURL = response.url;

  if (!isRedirected || !responseURL) {
    return null;
  }

  const url = new URL(responseURL, getHost(req));

  if (
    url.origin === getHost(req) ||
    url.origin === process.env.NEXT_PUBLIC_API_PAGE ||
    `${url.origin}/` === process.env.NEXT_PUBLIC_API_PAGE
  ) {
    return {
      destination: url.pathname + url.search,
      statusCode: 301,
    };
  }

  return {
    destination: url.href,
    statusCode: 301,
  };
}
