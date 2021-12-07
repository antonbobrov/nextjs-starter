import { GetServerSideProps } from 'next';
import { TemplateProps } from '@/types/page';
import RenderTemplate from '@/templates/RenderTemplate';
import { fetchSSP } from '@/utils/server/ssp';

const Router = () => (
    <RenderTemplate />
);
export default Router;

export const getServerSideProps: GetServerSideProps<
    TemplateProps
> = async (context) => fetchSSP(context);
