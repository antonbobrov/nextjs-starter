import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import nextConnect from 'next-connect';
import { TemplateProps } from '@/types/page';
import fetchPageAPI from '@/utils/server/fetchPage';

const handler = nextConnect().all((
    req: NextApiRequest,
    res: NextApiResponse<DeepRequired<TemplateProps>>,
) => {
    fetchPageAPI<TemplateProps>(req, res, (baseData) => {
        res.status(404).json({
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
