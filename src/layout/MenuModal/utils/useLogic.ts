import { menuSlice, useStoreMenu } from '@/store/reducers/menu';
import store from '@/store/store';
import { useOnRouterPush } from '@/utils/hooks/useOnRouterPush';
import {
  useFocusTrap,
  useOnEscape,
  usePreventDocumentScrolling,
} from '@anton.bobrov/react-hooks';
import { useTimeline } from '@anton.bobrov/react-vevet-hooks';
import { RefObject, useEffect, useState } from 'react';

interface IProps {
  ref: RefObject<HTMLDivElement>;
}

const DURATION = 2000;

export function useMenuLogic({ ref }: IProps) {
  const { isOpened } = useStoreMenu();
  const [isShown, setIsShown] = useState(false);

  useOnEscape(() => {
    if (isOpened) {
      store.dispatch(menuSlice.actions.close());
    }
  });

  useOnRouterPush(() => store.dispatch(menuSlice.actions.close()));

  usePreventDocumentScrolling(isShown);

  useFocusTrap(ref, { isDisabled: !isOpened });

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
        isOnce: true,
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

  return { isShown, timeline, isOpened };
}
