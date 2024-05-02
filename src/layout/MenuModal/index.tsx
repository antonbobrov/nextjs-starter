import cn from 'classnames';
import { FC, memo, useRef } from 'react';
import { useStoreLexicon } from '@/store/reducers/page';
import styles from './styles.module.scss';
import { MenuModalLinks } from './Links';
import { MenuModalBackground } from './Background';
import { MenuModalCloseButton } from './CloseButton';
import { useMenuLogic } from './utils/useLogic';

const Component: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { menu: lexicon } = useStoreLexicon();

  const { isShown, timeline } = useMenuLogic({ ref });

  return (
    <div
      ref={ref}
      className={cn(styles.menu, isShown && styles.show)}
      role="dialog"
      aria-modal
      aria-label={lexicon.label}
    >
      <MenuModalBackground timeline={timeline} scope={[0, 0.6]} />

      <MenuModalCloseButton timeline={timeline} scope={[0.5, 0.8]} />

      <div className={styles.scrollable}>
        <div className={styles.wrapper}>
          <MenuModalLinks timeline={timeline} scope={[0.5, 1]} />
        </div>
      </div>
    </div>
  );
};

Component.displayName = 'MenuModal';

export const MenuModal = memo(Component);
