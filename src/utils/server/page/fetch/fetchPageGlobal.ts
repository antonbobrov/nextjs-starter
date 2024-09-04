import { IPageApiFetchProps } from '@/types/PageApi';
import { IPageGlobal } from '@/types/Page';
import { GET_MOCK_GLOBAL } from '@/mock/GET_MOCK_GLOBAL';
import { getPageFetchURL } from '../../helpers/getPageFetchURL';

export async function fetchPageGlobal({
  path,
  locale,
}: IPageApiFetchProps): Promise<IPageGlobal> {
  const fetchURL = getPageFetchURL({ path: '/__global', locale });

  if (path) {
    fetchURL?.searchParams.append('path', path);
  }

  if (!fetchURL) {
    return GET_MOCK_GLOBAL({ path, locale });
  }

  const response = await (await fetch(fetchURL)).json();

  return response;
}
