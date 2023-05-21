import { menuSlice, useStoreMenu } from '@/store/reducers/menu';
import store from '@/store/store';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useOnRouterPush } from '@/utils/hooks/useOnRouterPush';
import {
  useFocusTrap,
  useOnEscape,
  usePreventDocumentScrolling,
} from '@anton.bobrov/react-hooks';
import { useTimeline } from '@anton.bobrov/react-vevet-hooks';
import styles from './styles.module.scss';
import { MenuModalLinks } from './Links';
import { MenuModalBackground } from './Background';
import { MenuModalCloseButton } from './CloseButton';

const DURATION = 2000;

export const MenuModal: FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { isOpened } = useStoreMenu();
  const [isShown, setIsShown] = useState(false);

  useOnEscape(() => {
    if (isOpened) {
      store.dispatch(menuSlice.actions.close());
    }
  });

  useOnRouterPush(() => store.dispatch(menuSlice.actions.close()));

  usePreventDocumentScrolling(isShown);

  useFocusTrap(parentRef, { isDisabled: !isOpened });

  const setAnimating = (bool: boolean) =>
    store.dispatch(menuSlice.actions.setIsAnimating(bool));

  const { play, reverse, timeline } = useTimeline({ duration: DURATION });

  // launch animation
  useEffect(() => {
    const menuProgress = timeline?.progress ?? 0;

    if (isOpened) {
      play();

      setAnimating(true);

      timeline?.callbacks.add('end', () => setAnimating(false), {
        once: true,
      });

      return;
    }

    if (menuProgress > 0) {
      reverse();

      setAnimating(true);

      const callback = timeline?.callbacks.add('progress', ({ progress }) => {
        if (progress === 0) {
          setAnimating(false);
          callback?.remove();
        }
      });
    }
  }, [isOpened, play, reverse, timeline?.callbacks, timeline?.progress]);

  // show/hide menu
  useEffect(() => {
    const callback = timeline?.addCallback('progress', ({ progress }) => {
      if (progress === 0 && timeline?.isReversed) {
        setIsShown(false);
      } else {
        setIsShown(true);
      }
    });

    return () => callback?.remove();
  }, [timeline]);

  return (
    <div ref={parentRef} className={cn(styles.menu, isShown && styles.show)}>
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
