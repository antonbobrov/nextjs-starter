import { MOCK_PAGES_COMPONENTS } from './pages/components';
import { MOCK_PAGES_HOME } from './pages';
import { MOCK_PAGES_NOT_FOUND } from './pages/not-found';

export function MOCK_GET_PAGE(pathProp: string) {
  const path = pathProp.startsWith('/') ? pathProp : `/${pathProp}`;

  if (path === '/') {
    return MOCK_PAGES_HOME(path);
  }

  if (path === '/_components') {
    return MOCK_PAGES_COMPONENTS(path);
  }

  return MOCK_PAGES_NOT_FOUND(path);
}
