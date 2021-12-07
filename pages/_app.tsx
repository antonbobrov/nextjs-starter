import 'src/styles/index.scss';
import type { AppProps } from 'next/app';
import 'src/utils/browser/adaptiveFontSize';
import 'src/router';

import store from '@/store/store';
import { Provider } from 'react-redux';
import LayoutHead from '@/components/layout/head';
import LayoutPreloader from '@/components/layout/preloader';
import LayoutHeader from '@/components/layout/header';
import { TemplateProps } from '@/types/page';
import LayoutPopupMenu from '@/components/layout/menu/popup';
import { useEffect } from 'react';

let init = false;

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as TemplateProps;

    if (!init) {
        store.dispatch({
            type: 'SET_PAGE_PROPS',
            data: props,
        });
        init = true;
    }
    useEffect(() => {
        store.dispatch({
            type: 'SET_PAGE_PROPS',
            data: props,
        });
    }, [props]);

    if (!!props && props.success) {
        return (
            <Provider store={store}>
                <LayoutHead />
                <div className="app" id="app">
                    <LayoutHeader isFixed />
                    <Component />
                </div>
                <LayoutPopupMenu />
                <LayoutPreloader />
            </Provider>
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
