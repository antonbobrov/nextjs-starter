import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { Footer } from '../Footer';
import { IProps } from './types';

export const LayoutContainer: FC<PropsWithChildren<IProps>> = ({
  children,
  className,
  style,
  hasTopSpacing = true,
  hasContentTopSpacing = true,
  hasFooter = true,
}) => (
  <>
    <main
      className={cn(
        styles.layout_container,
        className,
        hasTopSpacing && styles.top_spacing
      )}
      style={style}
    >
      <div
        className={cn(
          styles.content,
          hasTopSpacing && hasContentTopSpacing && styles.top_spacing
        )}
      >
        {children}
      </div>
    </main>

    {hasFooter && <Footer />}
  </>
);
