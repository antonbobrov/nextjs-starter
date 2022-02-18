import clearSSPCache from '@/server/clearSSPCache';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    res.json(clearSSPCache());
}
