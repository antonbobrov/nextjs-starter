import '../src/styles/index.scss';
import type { AppProps } from 'next/app';
import '../src/utils/browser/adaptiveFontSize';
import '../src/router';

import LayoutHead from '../src/components/layout/head';
import Preloader from '../src/components/layout/preloader';
import Header from '../src/components/layout/header';
import CustomCursor from '../src/components/layout/custom-cursor';
import { APIResponse } from '../src/types/types';
import { BaseTemplateData } from '../src/types/page';
import PageContext from '../src/store/pageContext';

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as APIResponse<
        BaseTemplateData
    >;
    if (props.success && !!props.data) {
        return (
            <PageContext.Provider value={{ ...props.data }}>
                <LayoutHead />
                <Preloader />
                <CustomCursor />
                <div className="app" id="app">
                    <Header isFixed />
                    <Component />
                </div>
            </PageContext.Provider>
        );
    }
    return <div>{`Some error at ${JSON.stringify(pageProps)}`}</div>;
}

export default MyApp;
