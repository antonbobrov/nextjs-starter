import { IComponent } from '@/types/Component';

export interface IHomeLink {
  name: string;
  href: string;
  isExternal: boolean;
}

export interface IProps extends IHomeLink, IComponent {}
