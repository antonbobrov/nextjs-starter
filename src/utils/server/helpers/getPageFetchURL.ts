import { IPageApiFetchProps } from '@/types/PageApi';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';

export function getPageFetchURL({ path, locale }: IPageApiFetchProps) {
  const base = process.env.API_PAGE_URL;

  if (!base) {
    return null;
  }

  const fetchURL = new URL(removeDublicateSlashes(`${base}/${path}`));
  fetchURL.searchParams.append('locale', locale ?? '');

  return fetchURL;
}
