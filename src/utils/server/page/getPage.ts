import { IPageApi, IPageApiFetchProps } from '@/types/PageApi';
import { fetchPageGlobal } from './fetch/fetchPageGlobal';
import { fetchPageTemplate } from './fetch/fetchPageTemplate';
import { getDynamicData } from './fetch/getDynamicData';

interface IProps {
  props: IPageApiFetchProps;
  shouldFetchTemplate?: boolean;
  callback?: (data: IPageApi) => IPageApi;
}

/** Get page props */
export async function getPage({
  props,
  shouldFetchTemplate = true,
  callback,
}: IProps) {
  const global = await fetchPageGlobal(props);

  const template = shouldFetchTemplate
    ? await fetchPageTemplate(props)
    : undefined;

  const dynamic = await getDynamicData(global, props);

  let data: IPageApi = {
    global,
    template,
    ...dynamic,
  };

  data = callback ? callback(data) : data;

  return { page: data };
}
