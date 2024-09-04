import { FC, PropsWithChildren, useMemo } from 'react';
import { TMediaContext } from './types';
import { MediaContext } from './Context';

export const MediaContextProvider: FC<
  PropsWithChildren<Partial<TMediaContext>>
> = ({ canLoadImage = true, canLoadVideo = true, children }) => {
  const value = useMemo(
    () => ({ canLoadImage, canLoadVideo }),
    [canLoadImage, canLoadVideo],
  );

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};
