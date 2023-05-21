import { HTMLAttributes, ReactElement } from 'react';

export interface IProps extends HTMLAttributes<HTMLDivElement> {
  /** @default true */
  hasSpacings?: boolean;
}

export interface ILinkEventEmitterProps {
  children: ReactElement;
}
