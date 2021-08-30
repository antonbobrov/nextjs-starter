import '../src/styles/globals.scss';
import type { AppProps } from 'next/app';

import LayoutHead from '../src/components/layout/head/Head';
import Header from '../src/components/layout/header/Header';
import { PagePlaceholderResponse, TemplateBaseData } from '../src/templates/_base/types';

function MyApp ({ Component, pageProps }: AppProps) {
    const props = pageProps as PagePlaceholderResponse<TemplateBaseData>;
    if (props.success && !!props.object) {
        return (
            <>
                <LayoutHead {...props.object} />
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
