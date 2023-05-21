import { layoutSlice, useStoreLayout } from '@/store/reducers/layout';
import { useStoreMenu } from '@/store/reducers/menu';
import store from '@/store/store';
import { TKey } from '@/types/General';
import { useDebouncedEffect } from '@anton.bobrov/react-hooks';
import PCancelable from 'p-cancelable';

const isReady = () =>
  new PCancelable<void>((resolve, reject) => {
    const blockingElements = document.querySelectorAll(
      '*[data-block-page-view]'
    );

    if (blockingElements.length > 0) {
      setTimeout(() => {
        isReady().then(resolve).catch(reject);
      }, 30);
    } else {
      resolve();
    }
  });

export function useTemplateLayoutStates(key: TKey) {
  const { isFirstLoaded, isVisible, isCurtainVisible } = useStoreLayout();
  const { isAnimating } = useStoreMenu();

  useDebouncedEffect(
    () => {
      if (!isFirstLoaded || isCurtainVisible || isVisible || isAnimating) {
        return undefined;
      }

      const promise = isReady();
      promise
        .then(() => store.dispatch(layoutSlice.actions.setIsVisible(true)))
        .catch(() => {});

      return () => promise.cancel();
    },
    [isFirstLoaded, isVisible, isCurtainVisible, key, isAnimating],
    100
  );
}
