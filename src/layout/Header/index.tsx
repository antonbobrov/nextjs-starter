import { FC } from 'react';
import Link from 'next/link';
import { useStoreGlobalProps } from '@/store/reducers/pageProps';
import { useStoreLexicon } from '@/store/reducers/lexicon';
import { ButtonSimple } from '@/components/Button/Simple';
import { menuSlice } from '@/store/reducers/menu';
import store from '@/store/store';
import styles from './styles.module.scss';
import { LayoutWrap } from '../Wrap';
import { HeaderMenu } from './Menu';

export const Header: FC = () => {
  const { links, menu } = useStoreGlobalProps();
  const lexicon = useStoreLexicon();

  return (
    <header className={styles.header}>
      <LayoutWrap className={styles.wrap}>
        <Link
          href={links.home}
          className={styles.logo}
          aria-label={lexicon.siteName}
        >
          {lexicon.siteName}
        </Link>

        <HeaderMenu className={styles.menu} links={menu || []} />

        <ButtonSimple
          tag="button"
          type="button"
          text={lexicon.menu.open}
          onClick={() => store.dispatch(menuSlice.actions.open())}
        />
      </LayoutWrap>
    </header>
  );
};
