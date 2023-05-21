/* eslint-disable promise/no-nesting */
import Router from 'next/router';
import { isBrowser } from '@anton.bobrov/react-hooks';
import { NCallbacks, Callbacks } from '@anton.bobrov/vevet-init';
import { hideRouterCurtain, showRouterCurtain } from './layout/RouterCurtain';
import { loadingSlice } from './store/reducers/loading';
import { layoutSlice } from './store/reducers/layout';
import store from './store/store';

interface ICallbackTypes extends NCallbacks.CallbacksTypes {
  push: false;
  updated: false;
}

let isLoading = false;

// disable scroll restoration
if (isBrowser) {
  window.history.scrollRestoration = 'manual';
}

/**
 * Callback on router change
 */
export const routerCallbacks = (
  isBrowser ? new Callbacks<ICallbackTypes>() : undefined
) as Callbacks<ICallbackTypes>;

// override router
(function override() {
  if (!isBrowser) {
    return;
  }

  // catch router
  const { router } = Router;
  if (!router) {
    setTimeout(() => {
      override();
    }, 30);

    return;
  }

  // Override .onPopState() listener
  window.removeEventListener('popstate', router.onPopState);
  window.addEventListener('popstate', () => {
    router.push(window.location.href, window.location.href);
  });

  // override push
  const pushFunc = router.push.bind(router);
  router.push = (...arg: Parameters<typeof pushFunc>) =>
    new Promise<boolean>((resolve, reject) => {
      if (isLoading) {
        reject();

        return;
      }

      isLoading = true;
      routerCallbacks.tbt('push', false);
      store.dispatch(loadingSlice.actions.start('router'));
      store.dispatch(layoutSlice.actions.setIsCurtainVisible(true));

      showRouterCurtain()
        .then(() => {
          store.dispatch(layoutSlice.actions.setIsVisible(false));

          pushFunc(...arg)
            .then((param) => {
              isLoading = false;
              routerCallbacks.tbt('updated', false);
              store.dispatch(loadingSlice.actions.end('router'));

              hideRouterCurtain()
                .then(() => {
                  store.dispatch(
                    layoutSlice.actions.setIsCurtainVisible(false)
                  );
                  resolve(param);
                })
                .catch(reject);
            })
            .catch((param) => {
              isLoading = false;
              routerCallbacks.tbt('updated', false);
              store.dispatch(loadingSlice.actions.end('router'));
              reject(param);
            });
        })
        .catch(reject);
    });
})();
