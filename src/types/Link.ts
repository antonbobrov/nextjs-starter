import { TKey } from './General';

export interface ILink {
  key: TKey;
  name: string;
  href: string;
}

export interface ILinkMenu extends ILink {
  isActive?: boolean;
}

export interface ILinksLanguage extends ILinkMenu {
  fullName: string;
}
