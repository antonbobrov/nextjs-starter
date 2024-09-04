import { FC, memo } from 'react';
import { registerComponent } from 'rc-api-registry';
import { Button } from '@/components/ui/Button';
import { TypedAnimation } from '@/components/animation/TypedAnimation';
import { IProps } from './types';

const Component: FC<IProps> = ({
  className,
  style,
  name,
  href,
  isExternal,
}) => (
  <TypedAnimation>
    <Button
      className={className}
      style={style}
      tag="a"
      href={href}
      target={isExternal ? '_blank' : undefined}
      text={name}
    />
  </TypedAnimation>
);

const MemoComponent = memo(Component);

export const HomeLink = registerComponent()(MemoComponent, 'HomeLink');
