import Document, {
    Html, Head, Main, NextScript,
    DocumentContext,
} from 'next/document';
import { SSPResponse } from '@/types/page';

class MyDocument extends Document {
    static async getInitialProps (ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render () {
        // eslint-disable-next-line no-underscore-dangle
        const props = this.props.__NEXT_DATA__.props.pageProps as Required<SSPResponse>;

        // get data
        let lang = 'en';
        let dir = 'ltr';
        let pageClassName = '';
        if (props.props) {
            const { global, templateName } = props.props;
            if (global) {
                lang = global.lang;
                dir = global.dir;
                pageClassName = `v-page-${templateName}`;
            }
        }

        return (
            <Html
                lang={lang}
                dir={dir}
                className={`${dir} ${pageClassName}`}
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
