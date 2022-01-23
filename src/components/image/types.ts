export interface ImagePaths {
    original: string;
    thumb?: string;
    thumbWebp?: string;
}

export type ImageSizes = {
    640?: string;
    750?: string;
    1024?: string;
    1440?: string;
    1920?: string;
    2560?: string;
}

export interface ImageAdaptivePaths extends ImagePaths {
    sizes?: ImageSizes;
    sizesWebp?: ImageSizes;
}
