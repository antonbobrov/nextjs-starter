import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { getPagesApiUrl } from '../../../server-config';
import nodeFetch from '../../../src/server/nodeFetch';
import { ExamplesTemplateData } from '../../../src/templates/examples';
import { PagePlaceholderResponse, TemplateBaseData } from '../../../src/templates/_base/types';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<PagePlaceholderResponse<DeepRequired<ExamplesTemplateData>>>,
) {
    // get base data
    const baseDataUrl = new URL(`${getPagesApiUrl()}/__base`);
    baseDataUrl.searchParams.set('requestUrl', req.url || '');

    // fetch base data
    const baseData = await (await nodeFetch<TemplateBaseData>(baseDataUrl.href));

    res.status(baseData.code).json({
        success: baseData.success,
        code: baseData.code,
        message: baseData.message,
        object: baseData.object ? {
            ...baseData.object,

            template: 'examples',

            document: {
                pagetitle: 'Vevet Examples',
                longtitle: '',
                description: '',
                introtext: '',
                content: '',
            },

        } : false,
    });
}
