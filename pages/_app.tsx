import 'src/styles/index.scss';
import type { AppProps } from 'next/app';
import 'src/utils/browser/adaptiveFontSize';
import 'src/router';
import { isBrowser } from 'src/app';

import store from '@/store/store';
import configSlice from '@/store/reducers/config';
import pagePropsSlice from '@/store/reducers/pageProps';
import lexiconSlice from '@/store/reducers/lexicon';

import { Provider } from 'react-redux';

import { SspClient } from '@/types/ssp';
import LayoutHead from '@/components/layout/head';
import LayoutPreloader from '@/components/layout/preloader';
import LayoutHeader from '@/components/layout/header';
import LayoutMenuPopup from '@/components/layout/menu/popup';
import { useEffect } from 'react';
import LayoutBreadCrumbsJSON from '@/components/layout/breadcrumbs/json';

let storeUpdated = false;
let rerenderProps = false;
function updateStore (props: SspClient) {
    if (props.data) {
        store.dispatch(pagePropsSlice.actions.set(props.data.props));
        store.dispatch(configSlice.actions.set(props.data.config));
        store.dispatch(lexiconSlice.actions.set(props.data.lexicon));
        storeUpdated = true;
    }
}

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as SspClient | {
        statusCode: number;
    };

    if (isBrowser && !storeUpdated) {
        if (!('statusCode' in props)) {
            updateStore(props);
        }
    }
    useEffect(() => {
        if (rerenderProps) {
            if (!('statusCode' in props)) {
                updateStore(props);
            }
        }
        rerenderProps = true;
    }, [props]);

    if ('statusCode' in props) {
        return <h1>{props.statusCode}</h1>;
    }

    if (props.data) {
        return (
            <Provider store={store}>
                <LayoutHead />
                <LayoutBreadCrumbsJSON />
                <div className="app" id="app">
                    <LayoutHeader />
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
            <h1>Ooops</h1>
            <br />
            {props.error && (
                <>
                    {props.error.name && <div>{props.error.name}</div>}
                    <br />
                    {props.error.body ? <pre>{props.error.body}</pre> : ''}
                </>
            )}
        </div>
    );
}

export default MyApp;
