import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import { LexiconData, PagePlaceholderResponse } from '../../../src/templates/_base/types';


export default function handler (
    req: NextApiRequest,
    res: NextApiResponse<PagePlaceholderResponse<DeepRequired<LexiconData>>>,
) {
    res.status(200).json({
        success: true,
        code: 200,
        message: 'ok',
        object: {
            siteName: 'Website',
        },
    });
}
