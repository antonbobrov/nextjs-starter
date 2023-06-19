import { IComponent } from '@/types/Component';

export interface IHomeIntro {
  /** nl2br */
  title: string;
  /** wysiwyg */
  description: string;
}

export interface IProps extends IHomeIntro, IComponent {}
