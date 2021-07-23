import Document, {
    Html, Head, Main, NextScript,
    DocumentContext,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps (ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render () {
        // eslint-disable-next-line no-underscore-dangle
        const { pageProps } = this.props.__NEXT_DATA__.props;
        let lang = 'en';
        let dir = 'ltr';
        if (pageProps) {
            lang = pageProps.lang ? pageProps.lang : lang;
            dir = pageProps.dir ? pageProps.dir : dir;
        }
        return (
            <Html
                lang={lang}
                dir={dir}
                className={`${dir} v-reset`}
            >
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
