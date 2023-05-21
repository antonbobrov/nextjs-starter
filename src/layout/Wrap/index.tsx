import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './index.module.scss';
import { IProps } from './types';

export const LayoutWrap = forwardRef<HTMLDivElement, IProps>(
  ({ variant, className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        className,
        styles.layout_wrap,
        variant === 1 && styles.variant_1
      )}
      style={style}
    >
      {children}
    </div>
  )
);
LayoutWrap.displayName = 'LayoutWrap';
