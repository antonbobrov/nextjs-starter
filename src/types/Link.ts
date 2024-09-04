import { TKey } from '@anton.bobrov/react-components';

export interface ILink {
  key: TKey;
  name: string;
  href: string;
}

export interface ILinkMenu extends ILink {
  isActive?: boolean;
}

export interface ILinksLanguage extends ILinkMenu {
  key: string;
  fullName: string;
}
