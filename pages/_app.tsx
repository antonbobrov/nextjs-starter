import 'src/styles/index.scss';
import type { AppProps } from 'next/app';
import 'src/utils/browser/adaptiveFontSize';
import 'src/router';

import { PageProps } from '@/types/page';
import store from '@/store/store';
import { Provider } from 'react-redux';
import LayoutHead from '@/components/layout/head';
import LayoutPreloader from '@/components/layout/preloader';
import LayoutHeader from '@/components/layout/header';
import LayoutMenuPopup from '@/components/layout/menu/popup';
import { useEffect } from 'react';
import LayoutBreadCrumbsJSON from '@/components/layout/breadcrumbs/json';
import { isBrowser } from 'src/app';

let storeUpdated = false;

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as PageProps;

    if (isBrowser && !storeUpdated) {
        store.dispatch({
            type: 'SET_PAGE_PROPS',
            data: props,
        });
        storeUpdated = true;
    }
    useEffect(() => {
        if (props.config) {
            const oldConfig = store.getState().pageProps?.config;
            if (oldConfig?.key !== props.config.key) {
                store.dispatch({
                    type: 'SET_PAGE_PROPS',
                    data: {
                        ...props,
                        config: {
                            ...props.config,
                            ...oldConfig.user,
                        },
                    },
                });
            }
        }
    }, [props]);

    if (!!props.response && props.response.success) {
        return (
            <Provider store={store}>
                <LayoutHead />
                <LayoutBreadCrumbsJSON />
                <div className="app" id="app">
                    <LayoutHeader isFixed />
                    <Component />
                    <LayoutMenuPopup />
                </div>
                <LayoutPreloader />
            </Provider>
        );
    }

    return (
        <div className="wrap">
            <br />
            <h1>Error</h1>
            <br />
            {!!props.response && !!props.response.error
                ? (
                    <>
                        {props.response.error.message ? <h2>{props.response.error.message}</h2> : ''}
                        <br />
                        {props.response.error.response ? <pre>{props.response.error.response}</pre> : ''}
                    </>
                )
                : ''}
        </div>
    );
}

export default MyApp;
