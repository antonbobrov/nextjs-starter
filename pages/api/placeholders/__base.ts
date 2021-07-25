import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { getHost, getPagesApiUrl } from '../../../server-config';
import nodeFetch from '../../../src/server/nodeFetch';
import { LexiconData, PagePlaceholderResponse, TemplateBaseData } from '../../../src/templates/_base/types';
import normalizeUrlSlashes from '../../../src/utils/types/normalizeUrlSlashes';


export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<PagePlaceholderResponse<DeepRequired<TemplateBaseData>>>,
) {
    // get request url
    let pageUrl = new URL(getHost());
    const { requestUrl: requestAPIUrl } = req.query;
    if (typeof requestAPIUrl === 'string') {
        const requestUrl = requestAPIUrl.replace('/api/placeholders/', '');
        const currentUrl = normalizeUrlSlashes(getHost() + requestUrl);
        pageUrl = new URL(currentUrl);
    }

    // get lexicon
    const lexicon = await (await nodeFetch<LexiconData>(`${getPagesApiUrl()}/__lexicon`)).object;

    // return base data
    res.status(200).json({
        success: true,
        code: 200,
        message: 'ok',
        object: {

            template: '',

            lang: 'en',
            dir: 'ltr',

            document: {
                pagetitle: 'Page name',
                longtitle: 'Long Page name',
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
