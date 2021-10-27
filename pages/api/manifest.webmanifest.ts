import { NextApiRequest, NextApiResponse } from 'next';
import { HomeTemplateData } from '../../src/templates/home';
import { getEnvUrlApiPage, getEnvUrlBase } from '../../src/utils/env';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // get home page data
    const data: HomeTemplateData = await (await fetch(getEnvUrlApiPage(), {
        headers: {
            APIKEY: process.env.API_KEY || '',
        },
    })).json();

    res.setHeader(
        'Cache-Control',
        'public, max-age=31536000, immutable',
    );

    if (!!data && data.success) {
        res.json({
            name: data.lexicon.siteName,
            short_name: data.lexicon.siteName,
            start_url: getEnvUrlBase(),
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
