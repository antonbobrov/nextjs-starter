import { FC, useRef } from 'react';
import cn from 'classnames';
import { useScopedTimelineProgress } from '@anton.bobrov/react-vevet-hooks';
import { Link } from '@anton.bobrov/react-components';
import { useStoreGlobalProps } from '@/store/reducers/pageProps';
import { IWithTimeline } from '../types';
import styles from './styles.module.scss';

export const MenuModalLinks: FC<IWithTimeline> = ({ timeline, scope }) => {
  const globalProps = useStoreGlobalProps();

  const ref = useRef<HTMLUListElement>(null);

  useScopedTimelineProgress({
    onProgress: ({ easing }) => {
      const element = ref.current;
      if (!element) {
        return;
      }

      element.style.opacity = `${easing}`;
      element.style.transform = `translateY(${(1 - easing) * 2}rem)`;
    },
    timeline,
    scope,
  });

  return (
    <ul ref={ref} className={styles.list}>
      {globalProps.menu?.map(({ key, href, name, isActive }) => (
        <li key={key} className={styles.li}>
          <Link
            href={href}
            className={cn(styles.anchor, isActive && styles.active)}
            aria-current={isActive ? 'page' : undefined}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
