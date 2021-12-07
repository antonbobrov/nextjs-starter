import { NextApiRequest, NextApiResponse } from 'next';
import { TemplateHomeProps } from '@/templates/home';
import env from '@/utils/env';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // get home page data
    const data: TemplateHomeProps = await (await fetch(env.getUrlApiPage(), {
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
            start_url: env.getUrlBase(),
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
