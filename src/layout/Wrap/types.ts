import { IComponent } from '@/types/Component';
import { HTMLAttributes } from 'react';

export interface IProps extends HTMLAttributes<HTMLDivElement>, IComponent {
  variant?: 1;
}
