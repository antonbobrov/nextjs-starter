import { FC } from 'react';
import { LayoutContainer } from '@/components/layout/Container';
import { BreadcrumbsList } from '@/components/layout/Breadcrumbs/List';
import { TypedAnimation } from '@/components/animation/TypedAnimation';
import { Buttons } from './lorem/Buttons';
import { Form } from './lorem/Form';
import { Typography } from './lorem/Typography';
import { IComponents } from './types';
import { Section } from './components/Section';
import { Media } from './lorem/Media';

const Components: FC<IComponents> = () => (
  <LayoutContainer hasMainTopPadding={false}>
    <BreadcrumbsList />

    <TypedAnimation>
      <Section title="Typography">
        <Typography />
      </Section>
    </TypedAnimation>

    <TypedAnimation>
      <Section title="Buttons">
        <Buttons />
      </Section>
    </TypedAnimation>

    <TypedAnimation>
      <Section title="Media">
        <Media />
      </Section>
    </TypedAnimation>

    <TypedAnimation>
      <Section title="Form">
        <Form />
      </Section>
    </TypedAnimation>
  </LayoutContainer>
);

export default Components;
