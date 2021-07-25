import { GetServerSideProps } from 'next';
import RenderTemplate from '../src/templates/RenderTemplate';
import getPageServerProps from '../src/server/getPageServerProps';
import { PagePlaceholderResponse } from '../src/templates/_base/types';

const Router = (
    props: Record<string, any>,
) => (
    <>
        <RenderTemplate {...props as any} />
    </>
);
export default Router;

export const getServerSideProps: GetServerSideProps<
    PagePlaceholderResponse<Record<string, any>>
> = async (context) => {
    const data = await getPageServerProps(context.resolvedUrl);
    context.res.statusCode = data.code;
    context.res.statusMessage = data.message;
    return {
        props: {
            ...data,
        },
    };
};
