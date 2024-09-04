import { TAppPage } from '@/types/PageApi';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    // eslint-disable-next-line no-underscore-dangle
    const props = this.props.__NEXT_DATA__.props
      .pageProps as Required<TAppPage>;

    const lang = props.page ? props.page.global.lang : 'en';

    return (
      <Html lang={lang}>
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
