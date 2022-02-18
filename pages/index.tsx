import { GetServerSideProps } from 'next';
import { PageProps } from '@/types/page';
import RenderTemplate from '@/templates/RenderTemplate';
import fetchSSP from '@/server/ssp';
import { getPageHTMLCache } from '@/server/page/cache';

const Router = () => (
    <RenderTemplate />
);
export default Router;

export const getServerSideProps: GetServerSideProps<
    PageProps
> = async (context) => {
    const { res } = context;

    const chachedContents = getPageHTMLCache(context.resolvedUrl);
    if (chachedContents) {
        res.setHeader('Content-Type', 'text/html');
        res.write(chachedContents);
        res.end();
        return {
            props: {} as any,
        };
    }

    const props = await fetchSSP(context);
    if ('redirect' in props) {
        return {
            redirect: props.redirect,
        };
    }
    return props;
};
