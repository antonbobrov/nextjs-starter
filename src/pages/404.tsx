import { getSwrTime } from '@/utils/server/helpers/getSwrTime';
import { GetStaticProps } from 'next';
import { getPage } from '@/utils/server/page/getPage';

const Page = () => null;

export default Page;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await getPage({ props: { path: '/not-found', locale } });
  const { template } = data.page;

  return {
    props: data,
    revalidate: getSwrTime(template?.meta.swr),
  };
};
