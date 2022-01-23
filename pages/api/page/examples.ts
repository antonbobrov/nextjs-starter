import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import { TemplateExamplesProps } from '@/templates/examples';
import { PageApiProps } from '@/types/page';
import fetchGlobalProps from '@/utils/server/fetchGlobalProps';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<DeepRequired<
        PageApiProps<TemplateExamplesProps>
    >>,
) => {
    const globalProps = await fetchGlobalProps(req);

    res.json({

        global: {
            ...globalProps,
            document: {
                ...globalProps.document,
                pagetitle: 'Examples',
                content: '',
            },
        },

        templateName: 'examples',
        template: {},

    });
};
export default handler;

