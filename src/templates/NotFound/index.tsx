import { FC } from 'react';
import { Heading } from '@/components/ui/Typography/Heading';
import { LayoutContainer } from '@/components/layout/Container';
import { INotFound } from './types';

const NotFound: FC<INotFound> = ({ meta }) => (
  <LayoutContainer>
    <Heading variant={1}>{meta.pagetitle}</Heading>
  </LayoutContainer>
);

export default NotFound;
