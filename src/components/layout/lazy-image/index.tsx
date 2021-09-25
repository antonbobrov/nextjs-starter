import {
    FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { utils } from 'vevet';
import app from '../../../app';
import { isBrowser } from '../../../utils/browser/isBrowser';
import styles from './styles.module.scss';

/**
 * Lazy image properties
 */
interface Data {
    fullsize?: boolean;
    src: string;
    srcSet?: string;
    alt?: string;
    title?: string;
}

interface LazyImageEl extends HTMLDivElement {
    handleLazyImage?: () => void;
}

/**
 * Lazy image.
 * Uses IntersectionObserver to define the moment when it needs to be loaded.
 * It IntersectionObserver is not supported, the image will be loaded immediately.
 */
const LazyImage: FC<Data> = ({
    fullsize = true,
    children,
    src,
    srcSet,
    alt,
    title,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrcSet, setImageSrcSet] = useState('/image/placeholder.svg');
    const ref = useRef<LazyImageEl>(null);

    // load the image when it appears into the viewport
    useEffect(() => {
        // set callback
        if (ref.current) {
            ref.current.handleLazyImage = () => {
                loadImage();
            };
        }
        // load the image when needed
        const promise = app.onPageShown();
        promise.then(() => {
            if (!!observer && !!ref.current) {
                observer.observe(ref.current);
            } else {
                loadImage();
            }
        }).catch(() => {});
        // destroy the scene
        return () => {
            promise.cancel();
            if (!!observer && !!ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    /**
     * Load the image
     */
    const loadImage = useCallback(() => {
        if (srcSet) {
            setImageSrcSet(srcSet);
        } else {
            setImageSrcSet(src);
        }
        if (!!observer && !!ref.current) {
            observer.unobserve(ref.current);
        }
    }, [src, srcSet]);

    return (
        <div
            className={`${styles.lazy_image} ${fullsize ? styles.fullsize : ''} ${isLoaded ? 'loaded' : ''}`}
            ref={ref}
        >
            <img
                src={src}
                srcSet={imageSrcSet}
                alt={alt || undefined}
                title={title || undefined}
                onLoad={() => {
                    setIsLoaded(true);
                }}
            />
            {children}
        </div>
    );
};

export default LazyImage;



// create an intersection observer for lazy images
let observer: IntersectionObserver | undefined;
if (isBrowser && utils.listeners.intersectionObserverSupported()) {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const element = entry.target as LazyImageEl;
                if (entry.isIntersecting) {
                    if (element.handleLazyImage) {
                        element.handleLazyImage();
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
