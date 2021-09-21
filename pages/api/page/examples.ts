import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import fetch from 'node-fetch';
import { BaseTemplateData } from '../../../src/types/page';
import { APIResponse } from '../../../src/types/types';
import normalizeUrlSlashes from '../../../src/utils/data/normalizeUrlSlashes';
import { ExamplesTemplateData } from '../../../src/templates/examples';
import { getEnvApiUrl } from '../../../src/utils/env';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<
        APIResponse<
            DeepRequired<ExamplesTemplateData>
        >
    >,
) {
    // get base data
    const baseDataUrl = new URL(normalizeUrlSlashes(`${getEnvApiUrl()}/__base`));
    baseDataUrl.searchParams.set('requestUrl', req.url || '/');
    const baseData: APIResponse<BaseTemplateData> = await (await fetch(baseDataUrl.href)).json();

    res.status(baseData.code).json({
        success: baseData.success,
        code: baseData.code,
        message: baseData.message,
        data: {
            ...baseData.data,

            template: 'examples',

            document: {
                pagetitle: 'Vevet Examples',
                longtitle: '',
                description: '',
                introtext: '',
                content: '',
            },

        },
    });
}
