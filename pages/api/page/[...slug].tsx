import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import fetch from 'node-fetch';
import { HomeTemplateData } from '../../../src/templates/home';
import { BaseTemplateData } from '../../../src/types/page';
import { APIResponse } from '../../../src/types/types';
import normalizeUrlSlashes from '../../../src/utils/data/normalizeUrlSlashes';
import { getEnvApiUrl } from '../../../src/utils/env';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<
        APIResponse<
            DeepRequired<HomeTemplateData>
        >
    >,
) {
    // get base data
    const baseDataUrl = new URL(normalizeUrlSlashes(`${getEnvApiUrl()}/__base`));
    baseDataUrl.searchParams.set('requestUrl', req.url || '/');
    const baseData: APIResponse<BaseTemplateData> = await (await fetch(baseDataUrl.href)).json();

    res.status(baseData.code).json({
        success: baseData.success,
        code: 404,
        message: 'Page Not Founnd',
        data: {
            ...baseData.data,

            template: 'home',

            document: {
                ...baseData.data.document,
                pagetitle: '404',
                longtitle: '404. Page Not Found',
                content: 'Hii',
            },

        },
    });
}
