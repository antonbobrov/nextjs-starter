import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import fetchGlobalProps from '@/server/fetchGlobalProps';
import { TemplateNotFoundProps } from '@/templates/not-found';
import { PageApiProps } from '@/types/page';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<DeepRequired<
        PageApiProps<TemplateNotFoundProps>
    >>,
) => {
    const globalProps = await fetchGlobalProps(req);

    res.status(404).json({

        global: {
            ...globalProps,
            document: {
                ...globalProps.document,
                pagetitle: '404. Page Not Found',
            },
            breadcrumbs: [
                ...globalProps.breadcrumbs,
                { id: 1, href: '/404/', name: '404' },
            ],
        },

        templateName: 'not-found',
        template: {},

    });
};
export default handler;
