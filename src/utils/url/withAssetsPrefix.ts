import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';

export function withAssetsPrefix(src: string) {
  if (
    process.env.NEXT_PUBLIC_ASSETS_PREFIX &&
    !src.includes('https') &&
    !src.includes('https')
  ) {
    return removeDublicateSlashes(
      `${process.env.NEXT_PUBLIC_ASSETS_PREFIX}/${src}`,
    );
  }

  return src;
}
