import { forwardRef, memo, useContext, useState } from 'react';
import { LazyVideo } from '@anton.bobrov/react-components';
import cn from 'classnames';
import { withAssetsPrefix } from '@/utils/url/withAssetsPrefix';
import { IProps } from './types';
import styles from './styles.module.scss';
import { MediaContext } from './context/Context';
import { Image } from '../Image';

/**
 * Media component.
 * Variants:
 * * image only
 * * video only
 * * both image and video (first, image is loaded then video; if the video can be played, the image will be hidden and the video will be rendered)
 */
const Component = forwardRef<HTMLDivElement, IProps>(
  (
    {
      className,
      style,
      image,
      video,
      onLoad,
      onImageReady,
      onVideoReady,
      loading = 'lazy',
      sizes,
    },
    ref,
  ) => {
    const context = useContext(MediaContext);

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isVideoPlayable, setIsVideoPlayable] = useState(false);

    const canRenderVideo =
      context.canLoadVideo &&
      ((video && !image) || (video && image && isImageLoaded));

    const canRenderImage = context.canLoadImage && image && !isVideoPlayable;

    return (
      <div ref={ref} className={cn(className, styles.media)} style={style}>
        {canRenderVideo && (
          <LazyVideo
            className={cn(styles.video, !!image && styles.replacable)}
            src={withAssetsPrefix(video)}
            muted
            loop
            playsInline
            autoPlay
            onLoadedMetadata={(evt) => onLoad?.(evt.currentTarget)}
            onTimeUpdate={(evt) => {
              if (!isVideoPlayable) {
                setIsVideoPlayable(true);
                onVideoReady?.(evt.currentTarget);
              }
            }}
            loading={loading}
          />
        )}

        {canRenderImage && (
          <Image
            {...image}
            alt={image.alt}
            loading={loading}
            sizes={sizes}
            onLoad={(evt) => {
              setIsImageLoaded(true);
              onLoad?.(evt.currentTarget);
              onImageReady?.(evt.currentTarget);
            }}
          />
        )}
      </div>
    );
  },
);

Component.displayName = 'Media';

export const Media = memo(Component);
