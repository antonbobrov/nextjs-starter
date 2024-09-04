import React, { FC, PropsWithChildren, useId, useRef } from 'react';
import anime from 'animejs';
import { DEFAULT_EASING } from '@/settings';
import store from '@/store/redux/store';
import { loadingSlice } from '@/store/redux/reducers/loading';
import styles from './styles.module.scss';
import { TransitionRouter } from '../TransitionRouter';

export const TransitionRouterCurtain: FC<PropsWithChildren> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const id = useId();

  return (
    <TransitionRouter
      onLeave={() =>
        new Promise((resolve) => {
          store.dispatch(loadingSlice.actions.start(id));

          anime({
            targets: ref.current,
            easing: DEFAULT_EASING,
            duration: 350,
            opacity: {
              value: [1, 1],
              easing: 'linear',
            },
            scaleY: [0, 1],
            begin: () => {
              ref.current!.style.display = 'block';
            },
            complete: () => resolve(),
          });
        })
      }
      onEnter={() =>
        new Promise<void>((resolve) => {
          store.dispatch(loadingSlice.actions.end(id));

          anime({
            targets: ref.current,
            easing: 'linear',
            duration: 350,
            opacity: 0,
            complete: () => {
              ref.current!.style.display = 'none';
              resolve();
            },
          });
        })
      }
    >
      {children}

      <div ref={ref} className={styles.transition_router_curtain} />
    </TransitionRouter>
  );
};
