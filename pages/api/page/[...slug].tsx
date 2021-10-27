import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import nextConnect from 'next-connect';
import { BaseTemplateData } from '../../../src/types/page';
import fetchPageAPI from '../../../src/utils/server/fetchPage';

const handler = nextConnect().all((
    req: NextApiRequest,
    res: NextApiResponse<DeepRequired<BaseTemplateData>>,
) => {
    fetchPageAPI<BaseTemplateData>(req, res, (baseData) => {
        res.json({
            ...baseData,

            template: 'not-found',

            document: {
                ...baseData.document,
                pagetitle: '404. Page Not Found',
            },

            data: {},

        });
    });
});

export default handler;
