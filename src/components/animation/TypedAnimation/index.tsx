import {
  cloneElement,
  FC,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useScrollViewAnimationTrigger } from '@anton.bobrov/react-components';
import cn from 'classnames';
import anime from 'animejs';
import { isBoolean, useEvent } from '@anton.bobrov/react-hooks';
import { IProps } from './types';
import styles from './styles.module.scss';

export const TypedAnimation: FC<IProps> = ({
  animation = 'fadeInUp',
  children,
  isActive: isActiveProp,
}) => {
  const ref = useRef<HTMLElement>(null);
  useImperativeHandle((children as any).ref, () => ref.current!);

  const { isActive } = useScrollViewAnimationTrigger({
    ref,
    animation: isBoolean(isActiveProp) ? isActiveProp : isActiveProp,
  });

  const animateIn = useEvent(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.style.willChange = 'opacity, transform';

    let props: any = {
      opacity: [0, 1],
    };

    if (animation === 'fadeInUp') {
      props = {
        ...props,
        translateY: ['2rem', 0],
      };
    }

    anime({
      ...props,
      targets: ref.current,
      duration: 1000,
      easing: 'easeOutQuad',
      complete: () => {
        element.style.willChange = '';
      },
    });
  });

  useEffect(() => {
    if (isActive) {
      animateIn();
    }
  }, [animateIn, isActive]);

  return cloneElement(children, {
    ...children.props,
    ref,
    className: cn(children.props.className, styles.on_scroll_view),
  });
};
