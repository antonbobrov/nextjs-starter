import { FC } from 'react';
import { Heading } from '@/components/ui/Typography/Heading';
import { LayoutContainer } from '@/components/layout/Container';

const Empty: FC = () => (
  <LayoutContainer>
    <Heading variant={1}>No Template</Heading>
  </LayoutContainer>
);

export default Empty;
