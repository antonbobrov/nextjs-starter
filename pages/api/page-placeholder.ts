import type { NextApiRequest, NextApiResponse } from 'next';
import ITemplateData from '../../src/templates/types';

import basePlaceholder from '../../src/page-placeholders/base';
import homePlaceholder from '../../src/page-placeholders/home';

export default function handler (
    req: NextApiRequest,
    res: NextApiResponse<ITemplateData>,
) {
    // get data
    const { requestUrl } = req.query;
    if (requestUrl) {
        // get page placeholder by url
        switch (requestUrl) {
            case '/':
                res.status(200).json(homePlaceholder);
                break;
            default:
                res.status(404).json({
                    ...basePlaceholder,
                    title: 'No page placeholder found',
                } as ITemplateData);
                break;
        }
    }
}
