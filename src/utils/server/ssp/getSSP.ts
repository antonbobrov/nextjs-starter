import { configSlice } from '@/store/reducers/config';
import { lexiconSlice } from '@/store/reducers/lexicon';
import { pagePropsSlice } from '@/store/reducers/pageProps';
import store from '@/store/store';
import { GetServerSidePropsContext } from 'next';
import { fetchSSP } from './fetch';

/**
 * Fetch server side props
 */
export async function getSSP(context: GetServerSidePropsContext) {
  const props = await fetchSSP(context);

  if ('ssp' in props && props.ssp.page) {
    const { page } = props.ssp;

    store.dispatch(pagePropsSlice.actions.set(page.props));
    store.dispatch(configSlice.actions.set(page.config));
    store.dispatch(lexiconSlice.actions.set(page.lexicon));
  }

  return props;
}
