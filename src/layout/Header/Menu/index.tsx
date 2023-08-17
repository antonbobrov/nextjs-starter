import { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { IProps } from './types';
import styles from './styles.module.scss';

export const HeaderMenu: FC<IProps> = ({ className, style, links }) => (
  <ul className={cn(styles.list, className)} style={style}>
    {links.map(({ key, name, href, isActive }) => (
      <li key={key} className={styles.li}>
        <Link
          href={href}
          className={cn(styles.link, isActive && styles.active)}
          aria-current={isActive ? 'page' : undefined}
        >
          {name}
        </Link>
      </li>
    ))}
  </ul>
);
