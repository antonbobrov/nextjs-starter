import { FC, useEffect, useRef, useState } from 'react';
import { ProgressPreloader as PreloaderModule } from '@anton.bobrov/vevet-init';
import store from '@/store/store';
import { layoutSlice } from '@/store/reducers/layout';
import { useStoreLexicon } from '@/store/reducers/page';
import styles from './styles.module.scss';

export const Preloader: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { preloader: lexicon } = useStoreLexicon();

  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isDone || !ref.current) {
      return undefined;
    }

    const preloader = new PreloaderModule({
      container: ref.current,
      hideAnimation: 500,
      lerp: 0.01,
      forceEnd: 500,
    });

    preloader.addCallback('progress', ({ progress: value }) =>
      setProgress(value),
    );

    preloader.addCallback('hidden', () => {
      store.dispatch(layoutSlice.actions.setIsFirstLoaded());
      setIsDone(true);
    });

    return () => preloader.destroy();
  }, [ref, isDone]);

  return (
    <div
      ref={ref}
      className={styles.container}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={parseInt((progress * 100).toFixed(0), 10)}
      aria-label={lexicon.label}
    >
      <div
        className={styles.progress}
        style={{ transform: `scale(${progress}, 1)` }}
      />
    </div>
  );
};
