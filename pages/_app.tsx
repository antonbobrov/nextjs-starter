import 'src/styles/index.scss';
import type { AppProps } from 'next/app';
import 'src/utils/browser/adaptiveFontSize';
import 'src/router';

import { SSPResponse } from '@/types/page';
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
function updateStore (props: SSPResponse) {
    store.dispatch({
        type: 'SET_PAGE_PROPS',
        data: props.props!,
    });
    store.dispatch({
        type: 'SET_CONFIG',
        data: props.config!,
    });
    store.dispatch({
        type: 'SET_LEXICON',
        data: props.lexicon!,
    });
    storeUpdated = true;
}

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as SSPResponse | {
        statusCode: number;
    };

    if (isBrowser && !storeUpdated) {
        if (!('statusCode' in props)) {
            updateStore(props);
        }
    }
    useEffect(() => {
        if (!('statusCode' in props)) {
            updateStore(props);
        }
    }, [props]);

    if ('statusCode' in props) {
        return <h1>{props.statusCode}</h1>;
    }

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
