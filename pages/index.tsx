import { GetServerSideProps } from 'next';
import RenderTemplate from '@/templates/RenderTemplate';
import fetchSSP from '@/server/ssp';

const Router = () => (
    <RenderTemplate />
);
export default Router;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = await fetchSSP(context);
    if (data.redirect) {
        return {
            redirect: data.redirect,
        };
    }
    if (data.data || data.error) {
        return {
            props: {
                data: data.data || null,
                error: data.error || null,
            },
        };
    }
    return {
        notFound: true,
    };
};
