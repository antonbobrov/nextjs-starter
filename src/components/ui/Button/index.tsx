import cn from 'classnames';
import { forwardRef } from 'react';
import Link from 'next/link';
import { ButtonAnchor } from '@anton.bobrov/react-components';
import styles from './styles.module.scss';
import { TButtonProps } from './types';

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  TButtonProps
>(({ className, style, text, ...props }, ref) => (
  <ButtonAnchor
    {...props}
    ref={ref}
    className={cn(styles.button, className)}
    style={style}
    title={text}
    renderAnchor={Link}
  >
    {text}
  </ButtonAnchor>
));

Button.displayName = 'Button';
