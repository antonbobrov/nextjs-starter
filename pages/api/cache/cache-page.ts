import { NextApiRequest, NextApiResponse } from 'next';
import env from '@/utils/env';
import { updatePageHTMLCache } from '@/utils/server/page/cache';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const url = new URL(
        typeof req.query.url === 'string' ? req.query.url : '/',
        env.getReqUrlBase(req),
    );
    updatePageHTMLCache(url);
    res.json({
        success: true,
    });
}
