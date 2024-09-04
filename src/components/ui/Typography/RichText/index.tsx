import cn from 'classnames';
import { forwardRef, useMemo } from 'react';
import { useForwardedRef } from '@anton.bobrov/react-hooks';
import styles from './styles.module.scss';
import { TProps } from './types';

export const RichText = forwardRef<HTMLDivElement, TProps>(
  ({ hasSpacings = true, className, html, ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);

    const additionalProps = useMemo(() => {
      if (html) {
        return { dangerouslySetInnerHTML: { __html: html } };
      }

      return {};
    }, [html]);

    return (
      <div
        ref={ref}
        {...props}
        {...additionalProps}
        className={cn(
          className,
          styles.richtext,
          hasSpacings && styles.has_spacings,
        )}
      />
    );
  },
);

RichText.displayName = 'RichText';
