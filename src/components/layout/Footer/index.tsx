import { forwardRef, memo } from 'react';
import cn from 'classnames';
import { IBaseComponent } from '@anton.bobrov/react-components';
import { usePageLexicon } from '@/store/page/hooks';
import styles from './styles.module.scss';

const Component = forwardRef<HTMLDivElement, IBaseComponent>(
  ({ className, style }, forwardedRef) => {
    const { copyright } = usePageLexicon();

    return (
      <footer
        ref={forwardedRef}
        className={cn(styles.footer, className)}
        style={style}
      >
        {copyright}
      </footer>
    );
  },
);

Component.displayName = 'Footer';

export const Footer = memo(Component);
