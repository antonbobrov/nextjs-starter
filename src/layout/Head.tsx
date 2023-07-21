import NextHead from 'next/head';
import { useStorePageProps } from '@/store/reducers/pageProps';
import { useStoreConfig } from '@/store/reducers/config';
import { useStoreLexicon } from '@/store/reducers/lexicon';
import { LayoutScripts } from './LayoutScripts';

export const Head = () => {
  const pageProps = useStorePageProps();
  const { url } = useStoreConfig();
  const lexicon = useStoreLexicon();
  const { meta, lang, languages } = pageProps.global;

  return (
    <>
      <NextHead>
        {/* meta */}
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />

        <title>{meta?.pagetitle || lexicon.siteName}</title>

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
        <meta name="theme-color" content="#1f1f1f" />
        <link rel="manifest" href="/api/manifest.webmanifest" />

        {!meta?.searchable && <meta name="robots" content="noindex" />}

        {/* meta */}
        {meta && (
          <>
            {meta.description && (
              <meta name="description" content={meta.description} />
            )}
            {meta.keywords && <meta name="keywords" content={meta.keywords} />}
            {meta.keywords && <meta name="lang" content={lang} />}
            {meta.description && (
              <meta name="abstract" content={meta.description} />
            )}
          </>
        )}

        {/* languages */}
        {languages?.map(({ key, href }) => (
          <link
            key={key}
            rel="alternate"
            href={new URL(href, url.base).href}
            hrefLang={`${key}`}
          />
        ))}

        {/* opengraph */}
        <meta property="og:site_name" content={lexicon.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta?.pagetitle} />
        {meta && meta.description && (
          <meta property="og:description" content={meta.description} />
        )}
        <meta property="og:url" content={url.url} />
        {meta && meta.image && (
          <meta property="og:image" content={meta.image} />
        )}

        {/* twiiter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta?.pagetitle} />
        {meta && meta.description && (
          <meta name="twitter:description" content={meta.description} />
        )}
        {meta && meta.image && (
          <meta property="twitter:image" content={meta.image} />
        )}

        {/* links */}
        <base href={url.base} />
        <link rel="canonical" href={url.canonical} />
      </NextHead>

      <LayoutScripts />
    </>
  );
};
