import { IBaseComponent } from '@anton.bobrov/react-components';
import { ReactNode } from 'react';

export interface IProps extends IBaseComponent {
  /** @default true */
  hasFooter?: boolean;
  /** @default true */
  hasXPadding?: boolean;
  /** @default true */
  hasTopPadding?: boolean;
  /** @default true */
  hasMainTopPadding?: boolean;
  children: ReactNode;
}
