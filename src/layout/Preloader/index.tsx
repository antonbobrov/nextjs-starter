import { layoutSlice } from '@/store/reducers/layout';
import store from '@/store/store';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { ProgressPreloader as PreloaderModule } from '@anton.bobrov/vevet-init';
import styles from './styles.module.scss';

export const Preloader: FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = parentRef.current;
    if (isDone || !container) {
      return () => {};
    }

    const preloader = new PreloaderModule({
      container,
      hide: 500,
      calc: {
        lerp: 0.01,
        forceEnd: 500,
      },
    });

    preloader.addCallback('progress', ({ progress: value }) =>
      setProgress(value)
    );

    preloader.addCallback('hidden', () => {
      store.dispatch(layoutSlice.actions.setIsFirstLoaded());
      setIsDone(true);
    });

    return () => preloader.destroy();
  }, [parentRef, isDone]);

  return (
    <div
      ref={parentRef}
      className={cn(styles.container, 'v-preloader')}
      aria-hidden
    >
      <div
        className={styles.progress}
        style={{ transform: `scale(${progress}, 1)` }}
      />
    </div>
  );
};
