import { IUseScrollViewAnimationTrigger } from '@anton.bobrov/react-components';
import { ReactElement } from 'react';

export interface IProps extends IUseScrollViewAnimationTrigger {
  /** @default 'fadeInUp' */
  kind?: 'fadeIn' | 'fadeInUp';
  onIn?: () => void;
  onOut?: () => void;
  children: ReactElement;
}
