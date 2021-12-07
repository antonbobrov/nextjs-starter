import PCancelable from 'p-cancelable';

interface Props {
    crossOrigin?: string | null;
}

export default function loadImage (
    source: string | HTMLImageElement,
    {
        crossOrigin = null,
    }: Props,
) {
    return new PCancelable((
        resolve: (img: HTMLImageElement) => void,
        reject: () => void,
    ) => {
        if (typeof source === 'string') {
            const img = new Image();
            img.crossOrigin = crossOrigin;
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
