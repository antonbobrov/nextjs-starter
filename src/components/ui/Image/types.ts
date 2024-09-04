import { IBaseComponent } from '@anton.bobrov/react-components';
import { SyntheticEvent } from 'react';

export type TImageNonSeo = {
  src: string;
  width: number;
  height: number;
};

export type TImage = TImageNonSeo & {
  alt: string;
};

export interface IProps extends TImage, IBaseComponent {
  quality?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  draggable?: boolean;
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
}
