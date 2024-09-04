import { getSwrTime } from '@/utils/server/helpers/getSwrTime';
import { getPage } from '@/utils/server/page/getPage';
import { GetStaticProps } from 'next';

const Page = () => null;

export default Page;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const data = await getPage({ props: { path: '/', locale } });
  const { template } = data.page;

  return {
    props: data,
    revalidate: getSwrTime(template?.meta.swr),
  };
};
