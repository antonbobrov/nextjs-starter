import { NextSeo } from 'next-seo';
import { usePage } from '@/store/page/hooks';
import { LayoutScriptsMicrodata } from './Scripts/Microdata';
import { LayoutScriptsCustom } from './Scripts/Custom';

export const LayoutHead = () => {
  const { template, url, global, lexicon } = usePage();
  const meta = template?.meta;

  return (
    <>
      <NextSeo
        title={meta?.pagetitle}
        description={meta?.description}
        noindex={!meta?.searchable}
        canonical={url.canonical}
        openGraph={{
          siteName: lexicon.siteName,
          type: 'website',
          images: meta?.image ? [{ url: meta?.image }] : [],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: meta?.keywords ?? '',
          },
          {
            property: 'format-detection',
            content: 'telephone=no',
          },
          {
            name: 'viewport',
            content:
              'width=device-width, height=device-height, initial-scale=1',
          },
          {
            name: 'lang',
            content: global.lang,
          },
          { name: 'theme-color', content: '#000000' },
        ]}
        languageAlternates={global.languages.map(({ key, href }) => ({
          href: new URL(href, url.base).href,
          hrefLang: key,
        }))}
        additionalLinkTags={[
          ...[16, 32, 64, 96].map((size) => ({
            rel: 'icon',
            type: 'image/png',
            href: `/favicons/favicon-${size}x${size}.png`,
            sizes: `${size}x${size}`,
          })),
          {
            rel: 'apple-touch-icon',
            href: '/favicons/192x192.png',
          },
        ]}
      />

      {/* <NextHead>
        <base href={url.base} />
      </NextHead> */}

      <LayoutScriptsCustom />

      <LayoutScriptsMicrodata />
    </>
  );
};
