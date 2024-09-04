import { FC, memo } from 'react';
import cn from 'classnames';
import { usePageLexicon, usePageTemplate } from '@/store/page/hooks';
import styles from './styles.module.scss';
import { IProps } from './types';
import { TransitionRouterLink } from '../../TransitionRouter/Link';

const Component: FC<IProps> = ({ className, style }) => {
  const template = usePageTemplate();
  const { navigation: lexicon } = usePageLexicon();

  const breadcrumbs = template?.breadcrumbs;

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(styles.breadcrumbs_list, className)}
      style={style}
      aria-label={lexicon.breadcrumbs}
    >
      <ul className={styles.list}>
        {breadcrumbs.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              styles.item,
              index === breadcrumbs.length - 1 && styles.active,
            )}
          >
            {index === breadcrumbs.length - 1 ? (
              <span>{item.name}</span>
            ) : (
              <TransitionRouterLink
                href={item.href}
                className={cn(
                  styles.link,
                  index === breadcrumbs.length - 1 && styles.active,
                )}
              >
                <span>{item.name}</span>
              </TransitionRouterLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

Component.displayName = 'BreadcrumbsList';

export const BreadcrumbsList = memo(Component);
