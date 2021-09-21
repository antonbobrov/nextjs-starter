import { GetServerSideProps } from 'next';
import RenderTemplate from '../src/templates/RenderTemplate';
import { APIResponse } from '../src/types/types';
import { getEnvApiPageUrl } from '../src/utils/env';
import normalizeUrlSlashes from '../src/utils/data/normalizeUrlSlashes';

const Router = (
    props: Record<string, any>,
) => (
    <>
        <RenderTemplate {...props as any} />
    </>
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
