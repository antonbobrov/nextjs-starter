import { GetServerSideProps } from 'next';
import RenderTemplate from '../src/templates/RenderTemplate';
import type { ITemplateBase } from '../src/templates/placeholder';
import getPageServerProps from '../src/server/getPageServerProps';

const Router = (props: ITemplateBase) => (
    <>
        <RenderTemplate {...props} />
    </>
);

export default Router;

export const getServerSideProps: GetServerSideProps<ITemplateBase> = async (context) => {
    const data = await getPageServerProps(context.resolvedUrl);
    context.res.statusCode = data.res.status;
    context.res.statusMessage = data.res.statusText;
    return {
        props: {
            ...data,
        },
    };
};
