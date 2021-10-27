import { GetServerSideProps } from 'next';
import RenderTemplate from '../src/templates/RenderTemplate';
import { BaseTemplateData } from '../src/types/page';
import normalizeUrlSlashes from '../src/utils/data/normalizeUrlSlashes';
import { getEnvUrlApiPage, getEnvUrlBase } from '../src/utils/env';

const Router = () => (
    <RenderTemplate />
);
export default Router;

export const getServerSideProps: GetServerSideProps<
    BaseTemplateData
> = async (context) => {
    const { res } = context;

    // get api data
    const apiURL = getEnvUrlApiPage(`${context.resolvedUrl}`);
    const response = await (await fetch(apiURL, {
        headers: {
            APIKEY: process.env.API_KEY || '',
        },
    }));
    res.statusCode = response.status;
    res.statusMessage = response.statusText;

    // check redirects
    if (response.redirected && process.env.IS_REAL_API === 'true') {
        const redirectUrl = new URL(response.url);
        res.setHeader('location', redirectUrl.pathname);
        res.statusCode = 301;
        res.end();
    }

    // get json response
    const json = await response.json();
    // set url data
    const currentUrl = getEnvUrlBase(`/${context.resolvedUrl}`);
    const currentUrlData = new URL(currentUrl);
    json.url = {
        url: currentUrl,
        canonical: normalizeUrlSlashes(`${currentUrlData.origin}/${currentUrlData.pathname}`),
    };

    // return data
    return {
        props: json,
    };
};
