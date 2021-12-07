import { NextApiRequest, NextApiResponse } from 'next';
import { DeepRequired } from 'ts-essentials';
import env from '../env';

async function fetchPageAPI<TemplateType> (
    req: NextApiRequest,
    res: NextApiResponse,
    getPlaceholder?: (
        baseData: DeepRequired<TemplateType>,
        response: NextApiResponse
    ) => void,
) {
    const currentUrl = (req.url || '').replace('api/page', '');
    const apiPageUrl = env.getUrlApiPage(currentUrl);
    // LOAD DATA
    if (process.env.API_IS_REAL === 'true' || !getPlaceholder) {
        // FROM BACKEND
        const response = await fetch(apiPageUrl, {
            headers: {
                APIKEY: process.env.API_KEY || '',
            },
        });
        res.statusCode = response.status;
        res.statusMessage = response.statusText;
        try {
            const json = await response.json();
            res.json(json);
        } catch (e) {
            // const text = await response.text();
            res.json({ success: false });
        }
    } else {
        // TEMPORAL DATA
        // get base data
        const baseDataUrl = env.getUrlApi('/__base/');
        const baseData = await (await fetch(baseDataUrl)).json();
        // load placeholder
        getPlaceholder(baseData, res);
    }
}

export default fetchPageAPI;
