import type {
    NextApiRequest, NextApiResponse,
} from 'next';
import { DeepRequired } from 'ts-essentials';
import { TemplateHomeProps } from '@/templates/home';
import { PageApiProps } from '@/types/page';
import fetchGlobalProps from '@/server/fetchGlobalProps';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<DeepRequired<
        PageApiProps<TemplateHomeProps>
    >>,
) => {
    const globalProps = await fetchGlobalProps(req);

    res.json({

        global: {
            ...globalProps,
            document: {
                ...globalProps.document,
                description: 'Home page',
                introtext: 'Welcome to the home page',
                content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            },
        },

        templateName: 'home',
        template: {},

    });
};
export default handler;

