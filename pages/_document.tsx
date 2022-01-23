import Document, {
    Html, Head, Main, NextScript,
    DocumentContext,
} from 'next/document';
import { GlobalProps, PageProps } from '@/types/page';

class MyDocument extends Document {
    static async getInitialProps (ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render () {
        // eslint-disable-next-line no-underscore-dangle
        const props = this.props.__NEXT_DATA__.props.pageProps as PageProps;
        const { global } = props;

        // get data
        let lang = 'en';
        let dir = 'ltr';
        let inject: GlobalProps['inject'] | undefined;
        if (global) {
            lang = global.lang;
            dir = global.dir;
            inject = global.inject;
        }
        const pageClassName = `v-page-${props.templateName}`;

        return (
            <Html
                lang={lang}
                dir={dir}
                className={`${dir} ${pageClassName}`}
            >
                <Head />
                <body>
                    {!!inject && inject.prependBody ? (
                        <div
                            className="inject"
                            dangerouslySetInnerHTML={{ __html: inject.prependBody }}
                        />
                    ) : ''}
                    <Main />
                    <NextScript />
                    {!!inject && inject.appendBody ? (
                        <div
                            className="inject"
                            dangerouslySetInnerHTML={{ __html: inject.appendBody }}
                        />
                    ) : ''}
                </body>
            </Html>
        );
    }
}

export default MyDocument;
