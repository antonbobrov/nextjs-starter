import '../src/styles/globals.scss';
import type { AppProps } from 'next/app';

import '../src/utils/set-css/viewportSize';
import app from '../src/app';
import LayoutHead from '../src/components/layout/head/Head';
import Header from '../src/components/layout/header/Header';

function MyApp ({ Component, pageProps }: AppProps) {
    return (
        <>
            <LayoutHead {...pageProps} />
            <div className="app" id="app">
                <Header {...pageProps} />
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;

if (app) {
    app.html.classList.add('use-native-scroll');
}
