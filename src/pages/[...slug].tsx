import { GetServerSideProps } from 'next';
import { TemplateRenderer } from '@/templates/Renderer';
import { ssp } from '@/utils/server/ssp';

const Router = () => <TemplateRenderer />;
export default Router;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await ssp.getSSP(context);

  if ('redirect' in data) {
    return { redirect: data.redirect };
  }

  if (data.ssp) {
    return {
      props: data.ssp,
    };
  }

  return {
    notFound: true,
  };
};
