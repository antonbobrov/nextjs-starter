import { getSwrTime } from '@/utils/server/helpers/getSwrTime';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPage } from '@/utils/server/page/getPage';

const Page = () => null;

export default Page;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const path = Array.isArray(params?.slug) ? `/${params?.slug.join('/')}` : '/';

  const data = await getPage({ props: { path, locale } });
  const { template } = data.page;

  if (template?.templateName === 'NotFound') {
    return { notFound: true };
  }

  return {
    props: data,
    revalidate: getSwrTime(template?.meta?.swr),
  };
};

export const getStaticPaths = (async () => ({
  paths: [],
  fallback: 'blocking',
})) satisfies GetStaticPaths;
