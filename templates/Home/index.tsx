import { Heading } from '@/components/Typography/Heading';
import { useStoreGlobalProps } from '@/store/reducers/pageProps';
import { FC } from 'react';
import { LayoutContainer } from '@/layout/Container';
import { LayoutWrap } from '@/layout/Wrap';
import { PageScroll, ScrollView } from '@anton.bobrov/react-components';
import { IHome } from './types';

const Home: FC<IHome> = () => {
  const globalProps = useStoreGlobalProps();

  return (
    <PageScroll.SmoothContainer>
      <LayoutContainer>
        <LayoutWrap variant={1}>
          <ScrollView.Element animation="fadeInUp">
            <Heading variant={1}>{globalProps.meta?.pagetitle}</Heading>
          </ScrollView.Element>
        </LayoutWrap>
      </LayoutContainer>
    </PageScroll.SmoothContainer>
  );
};

export default Home;
