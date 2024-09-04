import { FC } from 'react';
import Link from 'next/link';
import { usePageGlobal, usePageLexicon } from '@/store/page/hooks';
import { Button } from '@/components/ui/Button';
import store from '@/store/redux/store';
import { menuSlice } from '@/store/redux/reducers/menu';
import styles from './styles.module.scss';
import { HeaderMenu } from './Menu';

export const Header: FC = () => {
  const { links } = usePageGlobal();
  const lexicon = usePageLexicon();

  return (
    <header className={styles.header}>
      <Link
        href={links.home}
        className={styles.logo}
        aria-label={lexicon.siteName}
      >
        {lexicon.siteName}
      </Link>

      <HeaderMenu className={styles.menu} />

      <Button
        tag="button"
        type="button"
        text={lexicon.menu.open}
        onClick={() => store.dispatch(menuSlice.actions.open())}
      />
    </header>
  );
};
