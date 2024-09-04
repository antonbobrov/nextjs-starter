import { IPageApiFetchProps } from '@/types/PageApi';
import { TTemplate } from '@/templates/types';
import { GET_MOCK_PAGE } from '@/mock/GET_MOCK_PAGE';
import { getPageFetchURL } from '../../helpers/getPageFetchURL';

export async function fetchPageTemplate(
  props: IPageApiFetchProps,
): Promise<TTemplate> {
  const fetchURL = getPageFetchURL(props);

  if (!fetchURL) {
    return GET_MOCK_PAGE(props);
  }

  const response = await (await fetch(fetchURL)).json();

  return response;
}
