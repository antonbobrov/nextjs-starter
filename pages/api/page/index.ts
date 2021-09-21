import type { NextApiRequest, NextApiResponse } from 'next';
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
        code: baseData.code,
        message: baseData.message,
        data: {
            ...baseData.data,

            template: 'home',

            document: {
                ...baseData.data.document,
                description: 'Home page',
                introtext: 'Welcome to the home page',
                content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            },

        },
    });
}
