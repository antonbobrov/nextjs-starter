import cn from 'classnames';
import { forwardRef } from 'react';
import { TagName } from '@anton.bobrov/react-components';
import styles from './styles.module.scss';
import { IProps } from './types';

export const Heading = forwardRef<HTMLHeadingElement, IProps>(
  ({ variant, as, children, className, ...props }, ref) => {
    const style = as || variant;

    return (
      <TagName
        {...props}
        ref={ref}
        tagName={`h${variant}`}
        className={cn(className, as !== false && styles[`heading_${style}`])}
      >
        {children}
      </TagName>
    );
  },
);

Heading.displayName = 'Heading';
