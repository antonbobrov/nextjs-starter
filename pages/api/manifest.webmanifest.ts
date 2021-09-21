import { NextApiRequest, NextApiResponse } from 'next';
import { BaseTemplateData } from '../../src/types/page';
import { APIResponse } from '../../src/types/types';
import { getEnvApiPageUrl } from '../../src/utils/env';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // get home page data
    const data: APIResponse<BaseTemplateData> = await (await fetch(getEnvApiPageUrl())).json();

    if (data && data.data) {
        const info = data.data;
        res.status(200).json({
            name: info.lexicon.siteName,
            short_name: info.lexicon.siteName,
            start_url: info.url.siteUrl,
            display: 'fullscreen',
            background_color: '#000000',
            theme_color: '#000000',
            icons: [
                {
                    src: '/image/192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
                {
                    src: '/image/512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        });
    } else {
        res.status(200).json({});
    }
}
