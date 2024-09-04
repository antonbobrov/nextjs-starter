import cn from 'classnames';
import { FC, useRef } from 'react';
import { usePageGlobal, usePageLexicon } from '@/store/page/hooks';
import styles from './styles.module.scss';
import { useMenuNavigation } from './utils/useMenuNavigation';
import { useMenuAnimation } from './utils/useMenuAnimation';
import { TransitionRouterLink } from '../TransitionRouter/Link';

export const MenuModal: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { menu: lexicon } = usePageLexicon();
  const { menu } = usePageGlobal();

  const { isOpened } = useMenuNavigation(ref);

  const { isVisible } = useMenuAnimation(ref, isOpened);

  return (
    <div
      ref={ref}
      className={cn(styles.menu, isVisible && styles.visible)}
      role="dialog"
      aria-modal
      aria-label={lexicon.label}
    >
      <div className={cn(styles.background, 'js-menu-background')} />

      <div className={styles.scrollable}>
        <div className={styles.wrapper}>
          <ul className={styles.links}>
            {menu.map(({ key, href, name, isActive }) => (
              <li key={key} className="js-menu-item">
                <TransitionRouterLink
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {name}
                </TransitionRouterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
