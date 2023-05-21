import { NextApiRequest, NextApiResponse } from 'next';
import { url } from '@/utils/url';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  res.json({
    name: 'Next.js Starter',
    short_name: 'Next.js Starter',
    start_url: url.getHost(req),
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
}
