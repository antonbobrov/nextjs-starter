import { ImagePaths, ImageAdaptivePaths, ImageSizes } from '@/components/image/types';
import PCancelable from 'p-cancelable';
import app from 'src/app';

export const supportsWebP = (() => {
    if (typeof document === 'undefined') {
        return false;
    }
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
})();



interface LoadProps {
    crossOrigin?: string | null;
}

/**
 * Load an image
 */
function load (
    source: string | HTMLImageElement,
    props?: LoadProps,
) {
    const defaultLoadProps: Required<LoadProps> = {
        crossOrigin: null,
    };
    const loadProps = {
        ...defaultLoadProps,
        ...props,
    };

    return new PCancelable((
        resolve: (img: HTMLImageElement) => void,
        reject: () => void,
    ) => {
        if (typeof source === 'string') {
            const img = new Image();
            img.crossOrigin = loadProps.crossOrigin;
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject();
            };
            img.src = source;
        } else if (source instanceof HTMLImageElement) {
            if (source.complete) {
                resolve(source);
            } else {
                source.addEventListener('load', () => {
                    resolve(source);
                });
                source.addEventListener('error', () => {
                    reject();
                });
            }
        }
    });
}



/**
 * Normalize image properties
 */
function getImageProps (
    data: ImagePaths | ImageAdaptivePaths,
) {
    // get src
    let src = data.original;
    if (data.thumb) {
        src = data.thumb;
    }
    if (supportsWebP && !!data.thumbWebp) {
        src = data.thumbWebp;
    }

    // get src set
    let srcSet = '';
    // get webp images
    if (supportsWebP && 'sizesWebp' in data && !!data.sizesWebp) {
        srcSet = imageSizesToScrSet(data.sizesWebp);
    } else if ('sizes' in data && !!data.sizes) {
        srcSet = imageSizesToScrSet(data.sizes);
    }

    return {
        src,
        srcSet,
    };
}

function imageSizesToScrSet (
    data: ImageSizes,
) {
    function getSet (
        size: keyof ImageSizes,
    ) {
        if (data[size]) {
            return `${data[size]} ${size}w`;
        }
        return '';
    }
    return [
        getSet(640),
        getSet(750),
        getSet(1024),
        getSet(1440),
        getSet(1920),
        getSet(2560),
    ].filter((item) => !!item).join(', ');
}



/**
 * Get the nearest image src that would suit the user's resolution
 */
function getApproximatedSrcSet (
    data: ImagePaths | ImageAdaptivePaths,
) {
    const screenWidth = window.screen.width * app.viewport.dpr;

    const srcSetSizes: {
        width: number;
        src: string;
    }[] = [];
    let availableSizes: ImageSizes | undefined;

    if (supportsWebP && 'sizesWebp' in data && !!data.sizesWebp) {
        availableSizes = data.sizesWebp;
    } else if ('sizes' in data && !!data.sizes) {
        availableSizes = data.sizes;
    }

    if (availableSizes) {
        Object.keys(availableSizes).forEach((key) => {
            if (availableSizes) {
                const src = availableSizes[(key as unknown) as keyof ImageSizes];
                if (src) {
                    srcSetSizes.push({
                        width: key as any,
                        src,
                    });
                }
            }
        });
        if (srcSetSizes.length > 0) {
            return srcSetSizes.reduce((a, b) => (
                Math.abs(screenWidth - a.width) < Math.abs(screenWidth - b.width) ? a : b
            )).src;
        }
    }

    if (supportsWebP && !!data.thumbWebp) {
        return data.thumbWebp;
    }
    if (data.thumb) {
        return data.thumb;
    }
    return data.original;
}



const imageLoader = {
    load,
    getImageProps,
    getApproximatedSrcSet,
};
export default imageLoader;
