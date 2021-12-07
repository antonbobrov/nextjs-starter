import Document, {
    Html, Head, Main, NextScript,
    DocumentContext,
} from 'next/document';
import { TemplateProps } from '@/types/page';

class MyDocument extends Document {
    static async getInitialProps (ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render () {
        // eslint-disable-next-line no-underscore-dangle
        const { pageProps } = this.props.__NEXT_DATA__.props;
        const props = pageProps as TemplateProps;

        // get data
        let lang = 'en';
        let dir = 'ltr';
        let pageClassName = '';
        if (props) {
            lang = props.lang;
            dir = props.dir;
            if (props.template) {
                pageClassName = `v-page-${props.template}`;
            }
        }

        // get injections
        const { inject } = props;

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
