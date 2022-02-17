import NextHead from 'next/head';
import { useSelector } from 'react-redux';
import normalizers from '@/utils/normalizers';
import { selectPageProps } from '@/store/reducers/pageProps';

const LayoutHead = () => {
    const pageProps = useSelector(selectPageProps);
    const {
        document, settings, meta, lang, languages, inject,
    } = pageProps.global;
    const { url } = pageProps.config;

    return (
        <NextHead>

            {/* meta */}
            <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />

            <title>{document.pagetitle}</title>

            {/* icons */}
            {[16, 32, 64, 96].map((size) => (
                <link
                    key={size}
                    rel="icon"
                    type="image/png"
                    href={`/image/favicon-${size}x${size}.png`}
                    sizes={`${size}x${size}`}
                />
            ))}
            <link rel="apple-touch-icon" href="/image/192x192.png" />

            {/* web */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="/api/manifest.webmanifest" />

            {!settings.searchable ? <meta name="robots" content="noindex" /> : ''}

            {/* meta */}
            {meta.description ? <meta name="description" content={meta.description} /> : ''}
            {meta.keywords ? <meta name="keywords" content={meta.keywords} /> : ''}
            {meta.keywords ? <meta name="lang" content={lang} /> : ''}
            {meta.description ? <meta name="abstract" content={meta.description} /> : ''}

            <meta property="og:site_name" content={pageProps.lexicon.siteName} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={document.pagetitle} />
            {meta.description ? <meta property="og:description" content={meta.description} /> : ''}
            <meta property="og:url" content={url.url} />
            {meta.image ? <meta property="og:image" content={meta.image} /> : ''}

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={document.pagetitle} />
            {meta.description ? <meta name="twitter:description" content={meta.description} /> : ''}
            {meta.image ? <meta property="twitter:image" content={meta.image} /> : ''}

            {/* links */}
            <base href={url.base} />
            <link rel="canonical" href={url.canonical} />

            {/* languages */}
            {languages.map((item) => (
                <link
                    key={item.key}
                    rel="alternate"
                    hrefLang={item.key}
                    href={normalizers.urlSlashes(`${url.base}/${item.href}`)}
                />
            ))}

            {/* logo microdata */}
            {pageProps.templateName === 'home' ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            url: url.base,
                            logo: normalizers.urlSlashes(`${url.base}/image/512x512.png`),
                        }),
                    }}
                />
            ) : ''}

            {!!inject && !!inject.headJS ? <script dangerouslySetInnerHTML={{ __html: inject.headJS }} /> : ''}

        </NextHead>
    );
};

export default LayoutHead;
