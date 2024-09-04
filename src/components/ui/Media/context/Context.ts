import { createContext } from 'react';
import { TMediaContext } from './types';

const defaultValue: TMediaContext = {
  canLoadImage: true,
  canLoadVideo: true,
};

export const MediaContext = createContext(defaultValue);
