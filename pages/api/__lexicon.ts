import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { LexiconData } from '../../src/types/lexicon';

export default function handler (
    req: NextApiRequest,
    res: NextApiResponse<
        DeepRequired<LexiconData>
    >,
) {
    res.status(200).json({
        siteName: 'Website',
    });
}
