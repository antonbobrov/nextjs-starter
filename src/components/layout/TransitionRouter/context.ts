import { createContext } from 'react';

export type TTransitionRouterContext = {
  stage: 'leave' | 'enter' | 'none';
  onLeave: () => Promise<void>;
  onEnter: () => Promise<void>;
};

const defaultState: TTransitionRouterContext = {} as any;

export const TransitionRouterContext = createContext(defaultState);
