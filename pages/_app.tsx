import 'src/styles/index.scss';
import type { AppProps } from 'next/app';
import 'src/utils/browser/adaptiveFontSize';
import 'src/router';

import LayoutHead from '@/components/layout/head';
import LayoutPreloader from '@/components/layout/preloader';
import LayoutHeader from '@/components/layout/header';
import { TemplateProps } from '@/types/page';
import PageContext from '@/store/PageContext';
import LayoutPopupMenu from '@/components/layout/menu/popup';
import LayoutLoaderCurtain from '@/components/layout/loader-curtain';

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as TemplateProps;

    if (!!props && props.success) {
        return (
            <PageContext.Provider value={{ ...props }}>
                <LayoutHead />
                <div className="app" id="app">
                    <LayoutHeader isFixed />
                    <Component />
                </div>
                <LayoutPopupMenu />
                <LayoutLoaderCurtain />
                <LayoutPreloader />
            </PageContext.Provider>
        );
    }
    return (
        <div className="wrap">
            <br />
            <h1>Error</h1>
            <br />
            {!!pageProps && !!pageProps.errorMessage ? <h2>{pageProps.errorMessage}</h2> : ''}
            <br />
            {!!pageProps && !!pageProps.response ? <pre>{pageProps.response}</pre> : ''}
        </div>
    );
}

export default MyApp;
