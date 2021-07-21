import Head from 'next/head';
import type { ITemplateBase } from '../../../templates/placeholder';

const favicons = [16, 32, 64, 96];

export default function LayoutHead ({
    siteName,
    title,
    searchable,
    lang,
    url,
    meta,
}: ITemplateBase) {
    return (
        <Head>

            {/* meta */}
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no" />

            <title>{title}</title>

            {/* icons */}
            {favicons.map((ico) => (
                <link
                    key={ico}
                    rel="icon"
                    type="image/png"
                    href={`${url.staticUrl}image/favicon-${ico}x${ico}.png`}
                    sizes={`${ico}x${ico}`}
                />
            ))}
            <link rel="apple-touch-icon" href={`${url.staticUrl}image/192x192.png`} />

            {/* web */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href={`${url.staticUrl}manifest.webmanifest`} />

            {!searchable ? <meta name="robots" content="noindex" /> : ''}

            {/* meta */}
            <meta name="lang" content={lang} />
            {meta.description ? <meta name="description" content={meta.description} /> : ''}
            {meta.keywords ? <meta name="keywords" content={meta.keywords} /> : ''}
            {meta.description ? <meta name="abstract" content={meta.keywords} /> : ''}

            {/* links */}
            <base href={url.siteUrl} />
            <link rel="canonical" href={url.canonicalUrl} />

            {/* Facebook Tags */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            {meta.description ? <meta property="og:description" content={meta.description} /> : ''}
            <meta property="og:url" content={url.url} />
            {meta.image ? <meta property="og:image" content={meta.image} /> : ''}

        </Head>
    );
}
