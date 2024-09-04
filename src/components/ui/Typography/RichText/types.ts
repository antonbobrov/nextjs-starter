import { HTMLAttributes } from 'react';

type TBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'dangerouslySetInnerHTML'
>;

export type TProps = TBaseProps & {
  html?: string;
  /** @default true */
  hasSpacings?: boolean;
};
