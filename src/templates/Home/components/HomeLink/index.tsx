import { forwardRef } from 'react';
import { registerComponent } from 'rc-api-registry';
import { ScrollView } from '@anton.bobrov/react-components';
import { ButtonSimple } from '@/components/Button/Simple';
import { IProps } from './types';

const Component = forwardRef<HTMLAnchorElement, IProps>(
  ({ className, style, name, href, isExternal }, forwardedRef) => (
    <ScrollView.Element animation="fadeInUp">
      <ButtonSimple
        ref={forwardedRef}
        className={className}
        style={style}
        tag="a"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        text={name}
      />
    </ScrollView.Element>
  )
);

Component.displayName = 'HomeLink';

export const HomeLink = registerComponent()(Component, 'HomeLink');
