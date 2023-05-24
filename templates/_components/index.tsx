import { BreadcrumbsList } from '@/layout/Breadcrumbs/List';
import { LayoutContainer } from '@/layout/Container';
import { LayoutWrap } from '@/layout/Wrap';
import { FC } from 'react';
import { PageScroll } from '@anton.bobrov/react-components';
import { Block } from './Block';
import { Buttons } from './lorem/Buttons';
import { Form } from './lorem/Form';
import { Typography } from './lorem/Typography';

const Components: FC = () => (
  <PageScroll.SmoothContainer>
    <LayoutContainer>
      <LayoutWrap variant={1}>
        <BreadcrumbsList />

        <Block title="Typography">
          <Typography />
        </Block>

        <Block title="Buttons">
          <Buttons />
        </Block>

        <Block title="Form">
          <Form />
        </Block>
      </LayoutWrap>
    </LayoutContainer>
  </PageScroll.SmoothContainer>
);

export default Components;