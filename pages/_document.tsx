import Document, {
    Html, Head, Main, NextScript,
    DocumentContext,
} from 'next/document';
import { PagePlaceholderResponse, TemplateBaseData } from '../src/templates/_base/types';

class MyDocument extends Document {
    static async getInitialProps (ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render () {
        // eslint-disable-next-line no-underscore-dangle
        const { pageProps } = this.props.__NEXT_DATA__.props;
        const props = pageProps as PagePlaceholderResponse<TemplateBaseData>;

        // get data
        let lang = 'en';
        let dir = 'ltr';
        if (props.object) {
            const data = props.object;
            lang = data.lang;
            dir = data.dir;
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
