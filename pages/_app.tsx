import '../src/styles/index.scss';
import type { AppProps } from 'next/app';
import '../src/utils/browser/adaptiveFontSize';

import LayoutHead from '../src/components/layout/head/Head';
import Preloader from '../src/components/layout/preloader/Preloader';
import Header from '../src/components/layout/header/Header';
import { PagePlaceholderResponse, TemplateBaseData } from '../src/templates/_base/types';
import CustomCursor from '../src/components/layout/custom-cursor';

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as PagePlaceholderResponse<TemplateBaseData>;
    if (props.success && !!props.object) {
        return (
            <>
                <LayoutHead {...props.object} />
                <Preloader />
                <CustomCursor />
                <div className="app" id="app">
                    <Header {...props.object} />
                    <Component {...props.object as any} />
                </div>
            </>
        );
    }
    return <div>{`Some error at ${JSON.stringify(pageProps)}`}</div>;
}

export default MyApp;
