import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { getPagesApiUrl } from '../../../server-config';
import nodeFetch from '../../../src/server/nodeFetch';
import { PagePlaceholderResponse, TemplateBaseData } from '../../../src/templates/_base/types';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<PagePlaceholderResponse<DeepRequired<TemplateBaseData>>>,
) {
    // get base data
    const baseDataUrl = new URL(`${getPagesApiUrl()}/__base`);
    baseDataUrl.searchParams.set('requestUrl', req.url || '');

    // fetch base data
    const baseData = await (await nodeFetch<TemplateBaseData>(baseDataUrl.href));

    res.status(200).json({
        success: baseData.success,
        code: 404,
        message: baseData.message,
        object: baseData.object ? {
            ...baseData.object,

            template: 'error',

            document: {
                pagetitle: '404',
                longtitle: '404. Page Not Found',
                description: '',
                introtext: '',
                content: '',
            },

        } : false,
    });
}
