import { HTMLAttributes } from 'react';

export interface IProps extends HTMLAttributes<HTMLDivElement> {
  /** @default true */
  hasSpacings?: boolean;
}
