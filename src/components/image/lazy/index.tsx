import {
    forwardRef, ImgHTMLAttributes, useCallback,
    useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import { utils } from 'vevet';
import app from 'src/app';
import { isBrowser } from '@/utils/browser/isBrowser';
import styles from './styles.module.scss';

const placeholderSrc = '/image/placeholder.svg';

interface ImageAttributes extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
    src: string;
    alt: string;
}

interface Props extends ImageAttributes {
    /**
     * Positionate the image
     * @default 'cover'
     */
    pos?: false | 'cover' | 'contain';
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
     * Use background color placeholder.
     * Available only when useWrapper is true.
     * @default false
     */
    usePlaceholder?: boolean;
}

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
    handleLoad = undefined,
    useWrapper = true,
    usePlaceholder = false,
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
        if (restProps.srcSet) {
            setImageSrcSet(restProps.srcSet);
        } else {
            setImageSrcSet(restProps.src);
        }
        if (!!observer && !!domRef.current) {
            observer.unobserve(domRef.current);
        }
    }, [restProps]);

    // load the image when it appears into the viewport
    useEffect(() => {
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
    }, [domRef, loadImage]);



    const image = (
        <img
            {...restProps}
            src={restProps.src}
            alt={restProps.alt}
            srcSet={imageSrcSet}
            ref={domRef}
            className={[
                styles.img,
                'js-preload-ignore',
                isLoaded ? styles.loaded : '',
                isLoaded ? 'loaded' : '',
                pos === 'cover' ? styles.cover : '',
                pos === 'contain' ? styles.contain : '',
            ].join(' ')}
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
