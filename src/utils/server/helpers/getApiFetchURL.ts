import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';
import { getBaseURL } from './getBaseUrl';

export function getApiFetchURL(path: string) {
  const base = process.env.API_URL ?? getBaseURL('/api/mock/');

  const fetchURL = new URL(removeDublicateSlashes(`${base}/${path}`));

  return fetchURL;
}
