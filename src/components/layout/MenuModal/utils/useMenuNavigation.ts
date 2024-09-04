import { menuSlice, useStoreMenu } from '@/store/redux/reducers/menu';
import store from '@/store/redux/store';
import {
  useDebouncedProp,
  useFocusTrap,
  useOnEscape,
  usePreventDocumentScrolling,
} from '@anton.bobrov/react-hooks';
import { useRouter } from 'next/router';
import { RefObject, useEffect } from 'react';

export function useMenuNavigation(ref: RefObject<HTMLElement>) {
  const router = useRouter();
  const { isOpened } = useStoreMenu();

  const isOpenedDebounced = useDebouncedProp(isOpened, isOpened ? 100 : 0);

  useOnEscape(() => {
    if (isOpened) {
      store.dispatch(menuSlice.actions.close());
    }
  });

  useEffect(() =>
    router.events.on('routeChangeStart', () =>
      store.dispatch(menuSlice.actions.close()),
    ),
  );

  usePreventDocumentScrolling(isOpened);

  useFocusTrap(ref, { isDisabled: !isOpenedDebounced });

  return { isOpened };
}
