import { forwardRef, memo, useState } from 'react';
import NextImage from 'next/image';
import cn from 'classnames';
import { IProps } from './types';
import styles from './styles.module.scss';

const Component = forwardRef<HTMLImageElement, IProps>(
  (
    {
      className,
      style,
      src,
      width,
      height,
      alt,
      quality = 100,
      onLoad,
      ...props
    },
    ref,
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <NextImage
        {...props}
        ref={ref}
        className={cn(className, styles.image, isLoaded && styles.loaded)}
        style={style}
        src={src}
        width={width}
        height={height}
        alt={alt}
        quality={quality}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
      />
    );
  },
);

Component.displayName = 'Image';

export const Image = memo(Component);
