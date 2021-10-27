import {
    FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { utils } from 'vevet';
import app from '../../../app';
import { isBrowser } from '../../../utils/browser/isBrowser';
import styles from './styles.module.scss';

const placeholderSrc = '/image/placeholder.svg';

/**
 * Lazy image properties
 */
interface Data {
    /**
     * @default 'cover'
     */
    pos?: false | 'cover' | 'contain';
    /**
     * Use background color placeholder
     * @default false
     */
    usePlaceholder?: boolean;
    src: string;
    srcSet?: string;
    alt?: string;
    title?: string;
    draggable?: boolean;
    /**
     * @default 0
     */
    showDelay?: number;
    handleLoad?: (img: HTMLImageElement) => void;
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
    children,
    pos = 'cover',
    usePlaceholder = false,
    src,
    srcSet,
    alt,
    title,
    draggable,
    showDelay = 0,
    handleLoad,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrcSet, setImageSrcSet] = useState(placeholderSrc);
    const ref = useRef<LazyImageEl>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        ref.current.classList.toggle(styles.loaded, isLoaded);
    }, [isLoaded]);

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
            className={[
                styles.lazy_image,
                usePlaceholder ? styles.use_placeholder : '',
                pos === 'cover' ? styles.cover : '',
                pos === 'contain' ? styles.contain : '',
            ].join(' ')}
            ref={ref}
        >
            <img
                src={src}
                srcSet={imageSrcSet}
                alt={alt || undefined}
                title={title || undefined}
                draggable={draggable}
                onLoad={(e) => {
                    if (imageSrcSet !== placeholderSrc) {
                        utils.common.timeoutCallback(() => {
                            setIsLoaded(true);
                            if (handleLoad) {
                                handleLoad(e.currentTarget);
                            }
                        }, showDelay);
                    }
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
