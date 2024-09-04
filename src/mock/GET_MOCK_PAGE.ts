import { IPageApiFetchProps } from '@/types/PageApi';
import { GET_MOCK_PAGE_INDEX } from './pages';
import { GET_MOCK_PAGE_SLUG } from './pages/slug';
import { GET_MOCK_PAGE_COMPONENTS } from './pages/components';

export const GET_MOCK_PAGE = (props: IPageApiFetchProps) => {
  const { path } = props;

  if (path === '/') {
    return GET_MOCK_PAGE_INDEX(props);
  }

  if (path === '/components') {
    return GET_MOCK_PAGE_COMPONENTS(props);
  }

  return GET_MOCK_PAGE_SLUG(props);
};
