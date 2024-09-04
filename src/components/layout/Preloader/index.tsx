import { FC, useEffect, useRef, useState } from 'react';
import { ProgressPreloader as VevetPreloader } from 'vevet';
import { layoutSlice } from '@/store/redux/reducers/layout';
import store from '@/store/redux/store';
import styles from './styles.module.scss';

export const Preloader: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone || !ref.current) {
      return undefined;
    }

    const preloader = new VevetPreloader({
      container: ref.current,
      hideAnimation: 250,
      lerp: 0.05,
      forceEnd: 250,
    });

    preloader.addCallback('progress', ({ progress: value }) => {
      progressRef.current!.style.transform = `scale(${value}, 1)`;
    });

    preloader.addCallback('hidden', () => {
      store.dispatch(layoutSlice.actions.setIsFirstLoaded());
      setIsDone(true);
    });

    return () => preloader.destroy();
  }, [ref, isDone]);

  return (
    <div ref={ref} className={styles.preloader}>
      <div ref={progressRef} className={styles.progress} />
    </div>
  );
};
