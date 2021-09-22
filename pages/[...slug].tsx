import { GetServerSideProps } from 'next';
import RenderTemplate from '../src/templates/RenderTemplate';
import { getEnvApiPageUrl } from '../src/utils/env';
import normalizeUrlSlashes from '../src/utils/data/normalizeUrlSlashes';
import { APIResponse } from '../src/types/types';

const Router = () => (
    <RenderTemplate />
);
export default Router;

export const getServerSideProps: GetServerSideProps<
    APIResponse<
        Record<string, any>
    >
> = async (context) => {
    const apiURL = normalizeUrlSlashes(`${getEnvApiPageUrl()}/${context.resolvedUrl}`);
    const data = await (await fetch(apiURL)).json();
    context.res.statusCode = data.code;
    context.res.statusMessage = data.message;
    return {
        props: {
            ...data,
        },
    };
};
