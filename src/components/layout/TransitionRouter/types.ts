import { ReactNode } from 'react';
import { TTransitionRouterContext } from './context';

export interface IProps
  extends Pick<TTransitionRouterContext, 'onEnter' | 'onLeave'> {
  children: ReactNode;
}
