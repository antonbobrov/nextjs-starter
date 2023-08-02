import { FC } from 'react';
import { Heading } from '@/components/Typography/Heading';
import { LayoutContainer } from '@/layout/Container';
import { LayoutWrap } from '@/layout/Wrap';
import { useTemplate } from './_hooks/useTemplate';

const Empty: FC = () => {
  useTemplate();

  return (
    <LayoutContainer>
      <LayoutWrap variant={1}>
        <Heading variant={1}>No Template</Heading>
      </LayoutWrap>
    </LayoutContainer>
  );
};

export default Empty;
