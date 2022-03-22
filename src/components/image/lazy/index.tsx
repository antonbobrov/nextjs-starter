import {
    forwardRef, ImgHTMLAttributes, useCallback,
    useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import { utils } from 'vevet';
import app, { isBrowser } from 'src/app';
import imageLoader from '@/utils/loaders/image';
import { ImageAdaptivePaths, ImagePaths } from '@/components/image/types';
import styles from './styles.module.scss';
import imagePlaceholder from '../placeholder.svg';

const placeholderSrc = imagePlaceholder.src;

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
    ...tagProps
}, ref) => {
    const imageRef = useRef<LazyImageElement>(null);
    useImperativeHandle(ref, () => imageRef.current!);

    const [isLoaded, setIsLoaded] = useState(false);
    const imageSrc = tagProps.src || (imagePaths ? (imagePaths.thumb || imagePaths.original) : '');
    const [imageSrcSet, setImageSrcSet] = useState(placeholderSrc);

    /**
     * Load the image by replacing its src
     */
    const loadImage = useCallback(() => {
        const imageProps = imagePaths ? imageLoader.getImageProps(imagePaths) : undefined;
        const srcSet = imageProps ? imageProps.srcSet : tagProps.srcSet;
        const src = (imageProps ? imageProps.src : tagProps.src) || '';
        setImageSrcSet(srcSet || src);
        if (!!observer && !!imageRef.current) {
            observer.unobserve(imageRef.current);
        }
    }, [imagePaths, tagProps.src, tagProps.srcSet]);

    // load the image when it appears into the viewport
    // lazy load only
    useEffect(() => {
        if (loading !== 'lazy') {
            return undefined;
        }
        const el = imageRef.current!;
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
    }, [loading, imageRef, loadImage]);

    // preload image
    useEffect(() => {
        if (loading !== 'preload') {
            return undefined;
        }
        const timeout = setTimeout(() => {
            loadImage();
        }, 250);
        return () => {
            clearTimeout(timeout);
        };
    }, [loading, loadImage]);



    // collect classnames
    const classNames = [
        useAlpha ? styles.use_alpha : '',
        usePlaceholder ? styles.use_placeholder : '',
        [
            isLoaded ? styles.loaded : '',
            isLoaded ? 'loaded' : '',
        ].join(' '),
        [
            pos === 'cover' ? styles.cover : '',
            pos === 'contain' ? styles.contain : '',
            pos === 'fullabs' ? styles.fullabs : '',
        ].join(' '),
    ].join(' ').trim();



    const image = useMemo(() => (
        <img
            {...tagProps}
            alt={tagProps.alt || ''}
            src={imageSrc}
            srcSet={imageSrcSet}
            ref={imageRef}
            className={[
                styles.img,
                classNames,
                [
                    loading !== 'preload' ? 'js-preload-ignore' : '',
                    loading === 'preload' ? 'js-preload-global js-preload-inner' : '',
                ].join(' '),
            ].join(' ')}
            data-is-loaded={isLoaded ? 'true' : undefined}
            onLoad={(e) => {
                if (imageSrcSet !== placeholderSrc) {
                    setIsLoaded(true);
                    if (handleLoad) {
                        handleLoad(e.currentTarget);
                    }
                }
            }}
        />
    ), [classNames, handleLoad, imageSrc, imageSrcSet, isLoaded, loading, tagProps]);

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
                classNames,
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
