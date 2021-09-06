import { NextApiRequest, NextApiResponse } from 'next';
import getPageServerProps from '../../src/server/getPageServerProps';

export default async function func (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // get home page data
    const data = await getPageServerProps('/');

    if (data.success && data.object) {
        const info = data.object;
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
