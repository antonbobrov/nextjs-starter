import { NextApiRequest, NextApiResponse } from 'next';
import serverEnv from '@/server/env';
import { updatePageHTMLCache } from '@/server/page/cache';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const url = new URL(
        typeof req.query.url === 'string' ? req.query.url : '/',
        serverEnv.getReqUrlBase(req),
    );
    updatePageHTMLCache(url);
    res.json({
        success: true,
    });
}
