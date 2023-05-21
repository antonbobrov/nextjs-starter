import { TKey } from '@/types/General';

export interface IBreadcrumb {
  id: TKey;
  href: string;
  name: string;
}

export type TBreadcrumbs = IBreadcrumb[];
