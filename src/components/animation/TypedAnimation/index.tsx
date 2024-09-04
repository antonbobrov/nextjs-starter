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
import { uniqueeArray, useEvent } from '@anton.bobrov/react-hooks';
import { hasReduceMotion } from '@/utils/animation/hasReduceMotion';
import { DEFAULT_EASING } from '@/settings';
import { IProps } from './types';
import styles from './styles.module.scss';

export const TypedAnimation: FC<IProps> = ({
  kind = 'fadeInUp',
  onIn: onInProp,
  onOut: onOutProp,
  animation,
  inViewDelay,
  children,
}) => {
  const ref = useRef<HTMLElement>(null);
  useImperativeHandle((children as any).ref, () => ref.current!);

  const onIn = useEvent(onInProp);
  const onOut = useEvent(onOutProp);

  const { isActive } = useScrollViewAnimationTrigger({
    ref,
    animation,
    inViewDelay,
  });

  // in animation

  useEffect(() => {
    const element = ref.current;

    if (!isActive || !element || hasReduceMotion) {
      return undefined;
    }

    const willChangeArray = ['opacity'];

    let props: any = {
      opacity: {
        easing: 'linear',
        value: [0, 1],
      },
    };

    if (kind === 'fadeInUp') {
      props = {
        ...props,
        translateY: ['2rem', 0],
      };

      willChangeArray.push('transform');
    }

    element.style.willChange = uniqueeArray(willChangeArray).join(', ');

    const tm = anime({
      ...props,
      targets: ref.current,
      duration: 1000,
      easing: DEFAULT_EASING,
      complete: () => {
        element.style.willChange = '';
      },
    });

    onIn?.();

    return () => tm.pause();
  }, [isActive, kind, onIn]);

  // out fix

  useEffect(() => {
    if (hasReduceMotion) {
      return;
    }

    if (!isActive && ref.current) {
      ref.current.style.opacity = '0';
    }

    onOut?.();
  }, [isActive, onOut]);

  return cloneElement(children, {
    ...children.props,
    ref,
    className: cn(children.props.className, styles.typed_animation),
  });
};
