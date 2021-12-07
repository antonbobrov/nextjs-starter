import type { NextApiRequest, NextApiResponse } from 'next';
import { clearSSPCache } from '@/utils/server/ssp';

export default function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    res.json(clearSSPCache());
}
