import { IBaseComponent, TKey } from '@anton.bobrov/react-components';
import { TImage } from '../Image/types';

export type TMediaImage = TImage;

export type TMediaVideo = string;

export interface IMedia {
  image?: TMediaImage | null;
  video?: TMediaVideo | null;
}

export interface IMediaItem extends IMedia {
  key: TKey;
}

export interface IMediaProps extends IMedia {
  onLoad?: (media: HTMLImageElement | HTMLVideoElement) => void;
  onImageReady?: (media: HTMLImageElement) => void;
  onVideoReady?: (media: HTMLVideoElement) => void;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export interface IProps extends IMediaProps, IBaseComponent {}
