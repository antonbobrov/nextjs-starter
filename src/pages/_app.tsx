import '@/styles/index.scss';
import 'src/router';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { isBrowser } from '@anton.bobrov/react-hooks';
import { IAppPage } from '@/types/Page';
import { pagePropsSlice } from '@/store/reducers/pageProps';
import { configSlice } from '@/store/reducers/config';
import { lexiconSlice } from '@/store/reducers/lexicon';
import store from '@/store/store';
import { Head } from '@/layout/Head';
import { Layout } from '@/layout/Layout';
import { TemplateRenderer } from '@/templates/Renderer';

// a crutch to update redux
let isStoreUpdated = false;
let canRerenderProps = false;
function updateStore(props: IAppPage) {
  if (props.page) {
    store.dispatch(pagePropsSlice.actions.set(props.page.props));
    store.dispatch(configSlice.actions.set(props.page.config));
    store.dispatch(lexiconSlice.actions.set(props.page.lexicon));
    isStoreUpdated = true;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const withStaticProps = pageProps as
    | IAppPage
    | {
        statusCode: number;
      };

  if (isBrowser && !isStoreUpdated) {
    if (!('statusCode' in withStaticProps)) {
      updateStore(withStaticProps);
    }
  }

  useEffect(() => {
    if (canRerenderProps) {
      if (!('statusCode' in withStaticProps)) {
        updateStore(withStaticProps);
      }
    }
    canRerenderProps = true;
  }, [withStaticProps]);

  if ('statusCode' in withStaticProps) {
    return <h1>{withStaticProps.statusCode}</h1>;
  }

  if (withStaticProps.page) {
    return (
      <Provider store={store}>
        <Head />
        <Layout>
          <TemplateRenderer>
            <Component />
          </TemplateRenderer>
        </Layout>
      </Provider>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ooops</h1>
      <br />
      {withStaticProps.error && (
        <>
          {withStaticProps.error.name && (
            <div>{withStaticProps.error.name}</div>
          )}
          <br />
          {withStaticProps.error.body ? (
            <pre>{withStaticProps.error.body}</pre>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};

export default MyApp;
