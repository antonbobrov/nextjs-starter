import { ISitemapURL } from '@/types/Sitemap';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISitemapURL[]>,
) {
  res.json([{ loc: '/' }]);
}
