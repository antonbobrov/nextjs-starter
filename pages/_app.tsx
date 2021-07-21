import '../src/styles/globals.scss';
import type { AppProps } from 'next/app';

import '../src/utils/set-css/viewportSize';
import app from '../src/app';

function MyApp ({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;

if (app) {
    app.html.classList.add('use-native-scroll');
}
