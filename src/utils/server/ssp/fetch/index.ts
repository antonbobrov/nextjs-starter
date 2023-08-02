import { GetServerSidePropsContext, Redirect } from 'next';
import nodeFetch from 'node-fetch';
import getLexicon from '@/lexicon/getLexicon';
import { IAppPage, IPage } from '@/types/Page';
import { getSSPFetchUrl } from './getSSPFetchUrl';
import { getSSPPageConfig } from './getSSPPageConfig';
import { isSSPRedirected } from './isSSPRedirected';

export type TResult = { ssp: IAppPage } | { redirect: Redirect };

/**
 * Fetch server side props
 */
export async function fetchSSP(
  context: GetServerSidePropsContext
): Promise<TResult> {
  const { req, res } = context;

  const url = getSSPFetchUrl(context);

  try {
    const headers = { ...req.headers };
    delete headers.host;

    // fetch ssp
    const response = await nodeFetch(url.href, {
      headers: {
        ...(headers as any),
        APIKEY: process.env.API_KEY || '',
      },
    });

    // check if redirected
    const isRedirected = isSSPRedirected(context, response);
    if (isRedirected) {
      return { redirect: isRedirected };
    }

    // update response
    res.statusCode = response.status;
    res.statusMessage = response.statusText;

    // get page data
    const jsonProps: IPage = (await response.json()) as any;
    const props: IAppPage = {
      page: {
        props: jsonProps,
        config: getSSPPageConfig(context),
        lexicon: getLexicon(jsonProps.global.lang),
      },
    };

    // set meta image
    if (props.page) {
      if (!props.page.props.global.meta?.image) {
        const matches = JSON.stringify(props.page.props).match(
          /(http?s)?[^"' ]*\.(jpg|png)/
        );

        if (matches && props.page.props.global.meta) {
          props.page.props.global.meta.image = matches.shift();
        }
      }
    }

    return { ssp: props };
  } catch (error) {
    res.statusCode = 500;

    return {
      ssp: {
        error: {
          name: `${error}`,
          body: 'Some error',
        },
      },
    };
  }
}
