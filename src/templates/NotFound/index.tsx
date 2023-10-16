import { FC } from 'react';
import { PageScroll } from '@anton.bobrov/react-components';
import { Heading } from '@/components/Typography/Heading';
import { LayoutWrap } from '@/layout/Wrap';
import { useStoreGlobalProps } from '@/store/reducers/pageProps';
import { LayoutContainer } from '@/layout/Container';
import { INotFound } from './types';
import { useTemplate } from '../_hooks/useTemplate';

const NotFound: FC<INotFound> = () => {
  useTemplate();

  const globalProps = useStoreGlobalProps();

  return (
    <PageScroll.SmoothContainer>
      <LayoutContainer>
        <LayoutWrap variant={1}>
          <Heading variant={1}>{globalProps.meta.pagetitle}</Heading>
        </LayoutWrap>
      </LayoutContainer>
    </PageScroll.SmoothContainer>
  );
};

export default NotFound;
