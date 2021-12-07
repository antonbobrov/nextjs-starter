import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import nextConnect from 'next-connect';
import fetchPageAPI from '@/utils/server/fetchPage';
import { TemplateExamplesProps } from '@/templates/examples';

const handler = nextConnect().all((
    req: NextApiRequest,
    res: NextApiResponse<DeepRequired<TemplateExamplesProps>>,
) => {
    fetchPageAPI<TemplateExamplesProps>(req, res, (baseData) => {
        res.json({
            ...baseData,

            template: 'examples',

            document: {
                ...baseData.document,
                pagetitle: 'Examples',
                content: '',
            },

            data: {},

        });
    });
});

export default handler;
