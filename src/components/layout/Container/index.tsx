import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { Footer } from '../Footer';
import { IProps } from './types';

export const LayoutContainer: FC<IProps> = ({
  className,
  style,
  hasFooter = true,
  hasXPadding = true,
  hasTopPadding = true,
  hasMainTopPadding = true,
  children,
}) => (
  <div
    className={cn(
      styles.layout_container,
      className,
      hasTopPadding && styles.has_top_padding,
    )}
    style={style}
  >
    <main
      className={cn(
        styles.main,
        hasXPadding && styles.has_x_padding,
        hasMainTopPadding && styles.has_top_padding,
      )}
    >
      {children}
    </main>

    {hasFooter && <Footer className={styles.footer} />}
  </div>
);
