import { FC } from 'react';
import { usePageGlobal, usePageLexicon } from '@/store/page/hooks';
import { Button } from '@/components/ui/Button';
import store from '@/store/redux/store';
import { menuSlice, useStoreMenu } from '@/store/redux/reducers/menu';
import styles from './styles.module.scss';
import { HeaderMenu } from './Menu';
import { TransitionRouterLink } from '../TransitionRouter/Link';

export const Header: FC = () => {
  const { links } = usePageGlobal();

  const lexicon = usePageLexicon();
  const { isOpened } = useStoreMenu();

  return (
    <header className={styles.header}>
      <TransitionRouterLink
        href={links.home}
        className={styles.logo}
        aria-label={lexicon.siteName}
      >
        {lexicon.siteName}
      </TransitionRouterLink>

      <HeaderMenu className={styles.menu} />

      <Button
        tag="button"
        type="button"
        text={isOpened ? lexicon.menu.close : lexicon.menu.open}
        onClick={() => store.dispatch(menuSlice.actions.toggle())}
      />
    </header>
  );
};
