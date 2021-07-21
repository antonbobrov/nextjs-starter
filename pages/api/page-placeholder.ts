import type { NextApiRequest, NextApiResponse } from 'next';
import { getHost } from '../../server-config';

import getBasePlaceholder, { ITemplateBase } from '../../src/templates/placeholder';
import getHomePlaceholder from '../../src/templates/home/placeholder';

export default function handler (
    req: NextApiRequest,
    res: NextApiResponse<ITemplateBase>,
) {
    // get data
    const { requestUrl } = req.query;
    if (requestUrl) {
        const currentUrl = (getHost() + requestUrl as string).replace(/([^:]\/)\/+/g, '$1');
        const url = new URL(currentUrl);

        // get page placeholder by url
        switch (url.pathname) {
            case '/':
                res.status(200).json(getHomePlaceholder(url));
                break;

            default:
                res.status(404).json({
                    ...getBasePlaceholder(url),
                    title: 'No page placeholder found',
                } as ITemplateBase);
                break;
        }
    } else {
        res.status(404).json({
            ...getBasePlaceholder(new URL(getHost())),
            title: 'requestUrl is empty',
        } as ITemplateBase);
    }
}
