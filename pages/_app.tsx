import '../src/styles/globals.scss';
import type { AppProps } from 'next/app';

import '../src/utils/set-css/viewportSize';

function MyApp ({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
