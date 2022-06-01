import Document, {
    Html, Head, Main, NextScript,
    DocumentContext,
} from 'next/document';
import { GlobalProps, SSPResponse } from '@/types/page';

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
        let inject: GlobalProps['inject'] | undefined;
        let pageClassName = '';
        if (props.props) {
            const { global, templateName } = props.props;
            if (global) {
                lang = global.lang;
                dir = global.dir;
                inject = global.inject;
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
                    {!!inject && inject.prependBody && (
                        <div
                            className="inject"
                            dangerouslySetInnerHTML={{ __html: inject.prependBody }}
                        />
                    )}
                    <Main />
                    <NextScript />
                    {!!inject && inject.appendBody && (
                        <div
                            className="inject"
                            dangerouslySetInnerHTML={{ __html: inject.appendBody }}
                        />
                    )}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
