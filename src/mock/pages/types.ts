import { TTemplate } from '@/templates/types';
import { IPageApiFetchProps } from '@/types/PageApi';
import { DeepRequired } from 'ts-essentials';

export type TGetMockPage = (
  props: IPageApiFetchProps,
) => DeepRequired<TTemplate>;
