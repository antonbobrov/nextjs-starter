import {
    forwardRef, ImgHTMLAttributes, useCallback,
    useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import { utils } from 'vevet';
import app, { isBrowser } from 'src/app';
import { onLayoutPreloaderReady } from '@/store/reducers/layout';
import imageLoader from '@/utils/loaders/image';
import { ImageAdaptivePaths, ImagePaths } from '@/components/image/types';
import styles from './styles.module.scss';

const placeholderSrc = '/image/placeholder.svg';

type BaseImageAttributes = Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'>;
type ImageAttributes = BaseImageAttributes & {
    src?: string;
    imagePaths?: ImagePaths | ImageAdaptivePaths;
    alt: string;
}

interface ComponentProps {
    /**
     * Positionate the image
     * @default 'cover'
     */
    pos?: false | 'cover' | 'contain' | 'fullabs';
    loading?: 'lazy' | 'preload';
    /**
     * Callback on image loaded
     */
    handleLoad?: (img: HTMLImageElement) => void;
    /**
     * If need to wrap the image into a DIV element
     * @default true
     */
    useWrapper?: boolean;
    /**
     * Use opacity animation
     * @default true
     */
    useAlpha?: boolean;
    /**
     * Use background color placeholder.
     * Available only when useWrapper is true.
     * @default false
     */
    usePlaceholder?: boolean;
}

type Props = ComponentProps & ImageAttributes;

interface LazyImageElement extends HTMLImageElement {
    preloadLazyImage?: () => void;
}

/**
 * Lazy image.
 * Uses IntersectionObserver to define the moment when it needs to be loaded.
 * It IntersectionObserver is not supported, the image will be loaded immediately.
 */
const LazyImage = forwardRef<LazyImageElement, Props>(({
    children,
    pos = 'cover',
    loading = 'lazy',
    handleLoad = undefined,
    useWrapper = true,
    useAlpha = true,
    usePlaceholder = false,
    imagePaths,
    ...restProps
}, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrcSet, setImageSrcSet] = useState(placeholderSrc);
    const domRef = useRef<LazyImageElement>(null);
    useImperativeHandle(ref, () => domRef.current!);

    /**
     * Load the image by replacing its src
     */
    const loadImage = useCallback(() => {
        const imageProps = imagePaths
            ? imageLoader.getImageProps(imagePaths) : undefined;
        const srcSet = imageProps ? imageProps.srcSet : restProps.srcSet;
        const src = (imageProps ? imageProps.src : restProps.src) || '';
        if (srcSet) {
            setImageSrcSet(srcSet);
        } else {
            setImageSrcSet(src);
        }
        if (!!observer && !!domRef.current) {
            observer.unobserve(domRef.current);
        }
    }, [imagePaths, restProps.src, restProps.srcSet]);

    // load the image when it appears into the viewport
    // lazy load only
    useEffect(() => {
        if (loading !== 'lazy') {
            return () => {};
        }
        const el = domRef.current!;
        // set callback
        el.preloadLazyImage = () => {
            loadImage();
        };
        // load the image when needed
        const promise = app.onPageShown();
        promise.then(() => {
            if (observer) {
                observer.observe(el);
            } else {
                loadImage();
            }
        }).catch(() => {});
        // destroy the scene
        return () => {
            promise.cancel();
            if (observer) {
                observer.unobserve(el);
            }
        };
    }, [loading, domRef, loadImage]);

    // preload image
    useEffect(() => {
        if (loading === 'preload') {
            const promise = onLayoutPreloaderReady();
            promise.then(() => {
                loadImage();
            }).catch(() => {});
            return () => {
                promise.cancel();
            };
        }
        return () => {};
    }, [loading, loadImage]);



    const image = (
        <img
            {...restProps}
            src={restProps.src}
            alt={restProps.alt}
            srcSet={imageSrcSet}
            ref={domRef}
            className={[
                styles.img,
                useAlpha ? styles.use_alpha : '',
                [
                    loading !== 'preload' ? 'js-preload-ignore' : '',
                    loading === 'preload' ? 'js-preload-global js-preload-inner' : '',
                ].join(' '),
                [
                    isLoaded ? styles.loaded : '',
                    isLoaded ? 'loaded' : '',
                ].join(' '),
                [
                    pos === 'cover' ? styles.cover : '',
                    pos === 'contain' ? styles.contain : '',
                    pos === 'fullabs' ? styles.fullabs : '',
                ].join(' '),
            ].join(' ')}
            data-is-loaded={isLoaded ? 'true' : ''}
            onLoad={(e) => {
                if (imageSrcSet !== placeholderSrc) {
                    setIsLoaded(true);
                    if (handleLoad) {
                        handleLoad(e.currentTarget);
                    }
                }
            }}
        />
    );

    if (!useWrapper) {
        return (
            <>
                {image}
                {children}
            </>
        );
    }

    return (
        <div
            className={[
                styles.lazy_image,
                isLoaded ? styles.loaded : '',
                isLoaded ? 'loaded' : '',
                pos === 'cover' ? styles.cover : '',
                pos === 'contain' ? styles.contain : '',
                pos === 'fullabs' ? styles.fullabs : '',
                usePlaceholder ? styles.use_placeholder : '',
            ].join(' ')}
        >
            {image}
            {children}
        </div>
    );
});
LazyImage.displayName = 'Lazy image';

export default LazyImage;



// create an intersection observer for lazy images
let observer: IntersectionObserver | undefined;
if (isBrowser && utils.listeners.intersectionObserverSupported()) {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const element = entry.target as LazyImageElement;
                if (entry.isIntersecting) {
                    if (element.preloadLazyImage) {
                        element.preloadLazyImage();
                    }
                }
            });
        },
        {
            root: null,
            threshold: 0,
            rootMargin: '0px 0px 0px 0px',
        },
    );
}
