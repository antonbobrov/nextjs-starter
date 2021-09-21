import Document, {
    Html, Head, Main, NextScript,
    DocumentContext,
} from 'next/document';
import { BaseTemplateData } from '../src/types/page';
import { APIResponse } from '../src/types/types';

class MyDocument extends Document {
    static async getInitialProps (ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render () {
        // eslint-disable-next-line no-underscore-dangle
        const { pageProps } = this.props.__NEXT_DATA__.props;
        const props = pageProps as APIResponse<BaseTemplateData>;

        // get data
        let lang = 'en';
        let dir = 'ltr';
        let pageClassName = '';
        if (props.data) {
            const { data } = props;
            lang = data.lang;
            dir = data.dir;
            if (data.template) {
                pageClassName = `v-page-${data.template}`;
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
