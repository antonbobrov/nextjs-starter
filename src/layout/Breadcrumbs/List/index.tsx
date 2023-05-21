import { FC } from 'react';
import { useStoreGlobalProps } from '@/store/reducers/pageProps';
import { useStoreLexicon } from '@/store/reducers/lexicon';
import cn from 'classnames';
import { Link } from '@anton.bobrov/react-components';
import styles from './styles.module.scss';

export const BreadcrumbsList: FC = () => {
  const { breadcrumbs } = useStoreGlobalProps();
  const lexicon = useStoreLexicon();

  if (!breadcrumbs || !breadcrumbs.length) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label={lexicon.breadcrumbs}>
      <ul className={styles.list}>
        {breadcrumbs.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              styles.item,
              index === breadcrumbs.length - 1 && styles.active
            )}
          >
            {index === breadcrumbs.length - 1 ? (
              <span>{item.name}</span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  styles.link,
                  index === breadcrumbs.length - 1 && styles.active
                )}
              >
                <span>{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
