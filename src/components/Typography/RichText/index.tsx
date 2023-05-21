import cn from 'classnames';
import { forwardRef } from 'react';
import { useForwardedRef } from '@anton.bobrov/react-hooks';
import styles from './index.module.scss';
import { IProps } from './types';

export const RichText = forwardRef<HTMLDivElement, IProps>(
  ({ hasSpacings = true, children, className, ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);

    const classNames = cn(
      className,
      styles.richtext,
      hasSpacings ? styles.has_spacings : ''
    );

    return (
      <div ref={ref} {...props} className={classNames}>
        {children}
      </div>
    );
  }
);

RichText.displayName = 'RichText';
