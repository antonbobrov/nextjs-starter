import '../src/styles/index.scss';
import type { AppProps } from 'next/app';
import '../src/utils/browser/adaptiveFontSize';
import '../src/router';

import LayoutHead from '../src/components/layout/head';
import Preloader from '../src/components/layout/preloader';
import Header from '../src/components/layout/header';
import { BaseTemplateData } from '../src/types/page';
import PageContext from '../src/store/PageContext';
import PopupMenu from '../src/components/layout/popup-menu';
import { store } from '../src/store/store';

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as BaseTemplateData;

    if (!!props && props.success) {
        // update page data
        store.dispatch({
            type: 'updatePageData',
            data: props,
        });

        // render the page
        return (
            <PageContext.Provider value={{ ...props }}>
                <LayoutHead />
                <Preloader />
                <div className="app" id="app">
                    <Header isFixed />
                    <Component />
                </div>
                <PopupMenu />
            </PageContext.Provider>
        );
    }
    return <div>{`Some error at ${JSON.stringify(pageProps)}`}</div>;
}

export default MyApp;
