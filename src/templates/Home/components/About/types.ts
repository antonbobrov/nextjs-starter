import { IComponent } from '@/types/Component';
import { ReactNode } from 'react';

export interface IHomeAbout {
  /** wysiwyg */
  description: string;
}

export interface IProps extends IHomeAbout, IComponent {
  children?: ReactNode;
}
