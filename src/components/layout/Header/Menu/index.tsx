import { FC } from 'react';
import cn from 'classnames';
import { usePageGlobal, usePageLexicon } from '@/store/page/hooks';
import { IProps } from './types';
import styles from './styles.module.scss';
import { TransitionRouterLink } from '../../TransitionRouter/Link';

export const HeaderMenu: FC<IProps> = ({ className, style }) => {
  const { menu: lexicon } = usePageLexicon();
  const { menu } = usePageGlobal();

  return (
    <ul
      className={cn(styles.list, className)}
      style={style}
      aria-label={lexicon.label}
    >
      {menu.map(({ key, name, href, isActive }) => (
        <li key={key} className={styles.li}>
          <TransitionRouterLink
            href={href}
            className={cn(styles.link, isActive && styles.active)}
            aria-current={isActive ? 'page' : undefined}
          >
            {name}
          </TransitionRouterLink>
        </li>
      ))}
    </ul>
  );
};
