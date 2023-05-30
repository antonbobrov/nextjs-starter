import { Heading } from '@/components/Typography/Heading';
import { LayoutWrap } from '@/layout/Wrap';
import { useStoreGlobalProps } from '@/store/reducers/pageProps';
import { FC } from 'react';
import { LayoutContainer } from '@/layout/Container';
import { PageScroll } from '@anton.bobrov/react-components';
import { INotFound } from './types';

const NotFound: FC<INotFound> = () => {
  const globalProps = useStoreGlobalProps();

  return (
    <PageScroll.SmoothContainer>
      <LayoutContainer>
        <LayoutWrap variant={1}>
          <Heading variant={1}>{globalProps.meta?.pagetitle}</Heading>
        </LayoutWrap>
      </LayoutContainer>
    </PageScroll.SmoothContainer>
  );
};

export default NotFound;
