import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { DeepRequired } from 'ts-essentials';
import { LexiconData } from '../../src/types/lexicon';
import { BaseTemplateData } from '../../src/types/page';
import { APIResponse } from '../../src/types/types';
import normalizeUrlSlashes from '../../src/utils/data/normalizeUrlSlashes';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<
        APIResponse<
            DeepRequired<BaseTemplateData>
        >
    >,
) {
    // get request url
    let pageUrl = new URL(process.env.URL!);
    const { requestUrl: requestAPIUrl } = req.query;
    if (typeof requestAPIUrl === 'string') {
        const requestUrl = requestAPIUrl.replace('/api/page/', '');
        const currentUrl = normalizeUrlSlashes(`${process.env.URL!}/${requestUrl}`);
        pageUrl = new URL(currentUrl);
    }

    // get lexicon
    const lexicon: LexiconData = await (await fetch(`${process.env.API_URL!}__lexicon/`)).json();

    // return data
    res.status(200).json({
        success: true,
        code: 200,
        message: 'ok',
        data: {

            time: +new Date(),
            template: '',

            lang: 'en',
            dir: 'ltr',

            document: {
                pagetitle: lexicon.siteName,
                longtitle: lexicon.siteName,
                description: '',
                introtext: '',
                content: '',
            },

            url: {
                url: pageUrl.href,
                siteUrl: `${pageUrl.origin}/`,
                canonicalUrl: new URL(pageUrl.origin + pageUrl.pathname).href,
                staticUrl: `${pageUrl.origin}/`,
            },

            meta: [{
                attrType: 'name',
                attrVal: 'description',
                content: 'Page Description',
            }, {
                attrType: 'name',
                attrVal: 'keywords',
                content: '',
            }],

            settings: {
                searchable: true,
            },

            lexicon,

        },
    });
}
