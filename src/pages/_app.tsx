import '@/styles/index.scss';
import '@/setup';
import type { AppProps } from 'next/app';
import { TAppPage } from '@/types/PageApi';
import { Provider } from 'react-redux';
import store from '@/store/redux/store';
import { PageContext } from '@/store/page/context';
import { LayoutHead } from '@/components/layout/Head';
import { Layout } from '@/components/layout/Layout';
import { TemplateRenderer } from '@/templates/_Renderer/Renderer';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const MyApp = ({ Component, pageProps, router }: AppProps<TAppPage>) => {
  if ('statusCode' in pageProps) {
    return <Component />;
  }

  return (
    <Provider store={store}>
      <PageContext.Provider value={pageProps.page}>
        <LayoutHead />

        <style jsx global>{`
          html {
            --font-family-inter: ${inter.style.fontFamily};
          }
        `}</style>

        <Layout>
          {pageProps.page.template?.templateName ? (
            <TemplateRenderer
              {...pageProps.page.template}
              key={router.locale}
            />
          ) : (
            <Component {...pageProps} key={router.locale} />
          )}
        </Layout>
      </PageContext.Provider>
    </Provider>
  );
};

export default MyApp;
