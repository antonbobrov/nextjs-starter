import { LayoutContainer } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { getPage } from '@/utils/server/page/getPage';
import { GetServerSideProps } from 'next';

const Page = () => (
  <LayoutContainer>
    <Heading variant={1}>Custom Page</Heading>

    <br />

    <p>Test custom SSR page</p>
  </LayoutContainer>
);

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const data = await getPage({
    props: { path: '/custom', locale },
    shouldFetchTemplate: false,
    callback: (props) => ({
      ...props,
      template: {
        meta: {
          pagetitle: 'Custom page',
        },
        templateName: null as any,
      },
    }),
  });

  return {
    props: data,
  };
};
