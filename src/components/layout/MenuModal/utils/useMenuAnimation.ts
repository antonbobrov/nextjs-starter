import { DEFAULT_EASING } from '@/settings';
import anime from 'animejs';
import { RefObject, useEffect, useRef, useState } from 'react';

export function useMenuAnimation(
  ref: RefObject<HTMLElement>,
  isOpened: boolean,
) {
  const [timeline, setTimeline] = useState<anime.AnimeTimelineInstance | null>(
    null,
  );

  const [isVisible, setIsVisible] = useState(false);

  const prevIsVisible = useRef(false);

  useEffect(() => {
    const container = ref.current;
    const background = container?.querySelector('.js-menu-background');
    const items = container?.querySelectorAll('.js-menu-item');

    if (!container || !background || !items) {
      return undefined;
    }

    const instance = anime.timeline({
      autoplay: false,
      easing: DEFAULT_EASING,
      update: ({ progress }) => {
        const isCurrentVisible = progress > 0;

        if (isCurrentVisible !== prevIsVisible.current) {
          setIsVisible(isCurrentVisible);
          prevIsVisible.current = isCurrentVisible;
        }
      },
    });

    setTimeline(instance);

    instance.add({
      targets: background,
      duration: 400,
      scaleY: [0, 1],
    });

    instance.add(
      {
        targets: items,
        duration: 500,
        delay: anime.stagger(75),
        opacity: {
          easing: 'linear',
          value: [0, 1],
        },
        translateY: ['3.5rem', '0rem'],
      },
      '-=250',
    );

    return () => {
      instance.pause();
      setTimeline(null);
    };
  }, [ref]);

  useEffect(() => {
    if (!timeline) {
      return;
    }

    if (!isOpened && timeline.progress === 0) {
      return;
    }

    if (isOpened && timeline.reversed) {
      timeline.reverse();
    } else if (!isOpened && !timeline.reversed) {
      timeline.reverse();
    }

    timeline.play();
  }, [isOpened, timeline]);

  return { isVisible };
}
