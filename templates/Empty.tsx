import { Heading } from '@/components/Typography/Heading';
import { LayoutContainer } from '@/layout/Container';
import { LayoutWrap } from '@/layout/Wrap';
import { FC } from 'react';

const Empty: FC = () => (
  <LayoutContainer>
    <LayoutWrap variant={1}>
      <Heading variant={1}>No Template</Heading>
    </LayoutWrap>
  </LayoutContainer>
);

export default Empty;
