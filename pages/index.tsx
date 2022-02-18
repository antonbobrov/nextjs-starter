import { GetServerSideProps } from 'next';
import RenderTemplate from '@/templates/RenderTemplate';
import fetchSSP from '@/server/ssp';

const Router = () => (
    <RenderTemplate />
);
export default Router;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const props = await fetchSSP(context);
    if ('redirect' in props) {
        return {
            redirect: props.redirect,
        };
    }
    return props;
};
