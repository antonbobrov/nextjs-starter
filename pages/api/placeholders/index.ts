import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { getPagesApiUrl } from '../../../server-config';
import nodeFetch from '../../../src/server/nodeFetch';
import { HomeTemplateData } from '../../../src/templates/home/Home';
import { PagePlaceholderResponse, TemplateBaseData } from '../../../src/templates/_base/types';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<PagePlaceholderResponse<DeepRequired<HomeTemplateData>>>,
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

            template: 'home',

            document: {
                pagetitle: 'Home',
                longtitle: 'This is the home page',
                description: 'Home page',
                introtext: 'Welcome to the home page',
                content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            },

        } : false,
    });
}
