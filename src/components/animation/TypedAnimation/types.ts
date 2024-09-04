import { ReactElement } from 'react';

export interface IProps {
  isActive?: boolean;
  /** @default 'fadeInUp' */
  animation?: 'fadeIn' | 'fadeInUp';
  children: ReactElement;
}
