import app from 'src/app';

interface Set {
    src: string;
    width: number;
}

/**
 * Get the nearest image src that would suit the user's resolution
 */
export default function getApproximatedSrcSet (
    srcSet: string,
) {
    const screenWidth = window.screen.width * app.viewport.dpr;

    const sets = srcSet.split(',').map((set) => {
        const currentSet = set.replace(/\s+/g, ' ').trim();
        const parts = currentSet.split(' ').map((val) => val.replace(/\s+/g, ' ').trim());
        const src = parts[0];
        if (parts[1]) {
            // check if width
            if (new RegExp(/(\d)*w/g).test(parts[1])) {
                const width = parseInt(parts[1], 10) || screenWidth;
                return {
                    src,
                    width,
                };
            }
        } else {
            return {
                src,
                width: 0,
            };
        }
        return undefined;
    }).filter((val) => !!val) as Set[];

    const closest = sets.reduce((a: Set, b: Set) => (
        Math.abs(screenWidth - a.width) < Math.abs(screenWidth - b.width) ? a : b
    ));
    return closest;
}
