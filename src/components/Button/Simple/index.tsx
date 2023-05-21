import cn from 'classnames';
import { forwardRef } from 'react';
import { ButtonAnchor } from '@anton.bobrov/react-components';
import styles from './styles.module.scss';
import { TButtonSimpleProps } from './types';

export const ButtonSimple = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  TButtonSimpleProps
>(({ className, style, text, ...props }, ref) => (
  <ButtonAnchor
    ref={ref}
    className={cn(styles.button, className)}
    style={style}
    title={text}
    {...props}
  >
    {text}
  </ButtonAnchor>
));

ButtonSimple.displayName = 'ButtonSimple';
