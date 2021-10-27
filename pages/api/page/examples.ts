import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import nextConnect from 'next-connect';
import { BaseTemplateData } from '../../../src/types/page';
import fetchPageAPI from '../../../src/utils/server/fetchPage';
import { ExamplesTemplateData } from '../../../src/templates/examples';

const handler = nextConnect().all((
    req: NextApiRequest,
    res: NextApiResponse<DeepRequired<BaseTemplateData>>,
) => {
    fetchPageAPI<ExamplesTemplateData>(req, res, (baseData) => {
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
