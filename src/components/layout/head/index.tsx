import Head from 'next/head';
import PageContext from '../../../store/pageContext';

const LayoutHead = () => (
    <PageContext.Consumer>
        {(props) => {
            const {
                document, url, settings, meta,
            } = props;
            return (
                <Head>

                    {/* meta */}
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no" />

                    <title>{document.longtitle || document.pagetitle}</title>

                    {/* icons */}
                    {[16, 32, 64, 96].map((size) => (
                        <link
                            key={size}
                            rel="icon"
                            type="image/png"
                            href={`${url.staticUrl}image/favicon-${size}x${size}.png`}
                            sizes={`${size}x${size}`}
                        />
                    ))}
                    <link rel="apple-touch-icon" href={`${url.staticUrl}image/192x192.png`} />

                    {/* web */}
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="manifest" href={`${url.staticUrl}api/manifest.webmanifest`} />

                    {!settings.searchable ? <meta name="robots" content="noindex" /> : ''}

                    {/* meta */}
                    {meta.map((metaData) => {
                        if (metaData.attrType === 'name') {
                            return (
                                <meta
                                    key={metaData.attrVal}
                                    name={metaData.attrVal}
                                    content={metaData.content}
                                />
                            );
                        }
                        return (
                            <meta
                                key={metaData.attrVal}
                                property={metaData.attrVal}
                                content={metaData.content}
                            />
                        );
                    })}

                    {/* links */}
                    <base href={url.siteUrl} />
                    <link rel="canonical" href={url.canonicalUrl} />

                </Head>
            );
        }}
    </PageContext.Consumer>
);

export default LayoutHead;
