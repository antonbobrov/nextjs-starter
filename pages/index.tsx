import { GetServerSideProps } from 'next';
import { PageProps } from '@/types/page';
import RenderTemplate from '@/templates/RenderTemplate';
import fetchSSP from '@/utils/server/ssp';

const Router = () => (
    <RenderTemplate />
);
export default Router;

export const getServerSideProps: GetServerSideProps<
    PageProps
> = async (context) => {
    const props = await fetchSSP(context);
    if ('redirect' in props) {
        return {
            redirect: props.redirect,
        };
    }
    return props;
};
