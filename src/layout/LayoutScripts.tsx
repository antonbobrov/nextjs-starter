/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { useStoreConfig } from '@/store/reducers/config';
import { useStoreLexicon } from '@/store/reducers/lexicon';
import { useStorePageProps } from '@/store/reducers/pageProps';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';
import Script from 'next/script';
import { FC } from 'react';

export const LayoutScripts: FC = () => {
  const pageProps = useStorePageProps();
  const { url } = useStoreConfig();
  const lexicon = useStoreLexicon();
  const { social } = pageProps.global;

  return (
    <>
      {/* logo microdata */}
      {pageProps.templateName === 'home' && (
        <Script
          strategy="beforeInteractive"
          id="js_application_microdata"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              url: url.base,
              name: lexicon.siteName,
              logo: removeDublicateSlashes(`${url.base}/image/512x512.png`),
              sameAs: social.map(({ href }) => href),
            }),
          }}
        />
      )}

      <Script
        strategy="beforeInteractive"
        id="js_settings"
        dangerouslySetInnerHTML={{
          __html: `
            window.USE_DAT_GUI = ${process.env.NODE_ENV === 'development'};
          `,
        }}
      />

      <Script
        strategy="beforeInteractive"
        id="js_page_router_fix_origin"
        dangerouslySetInnerHTML={{
          __html: `
            if (!window.location.origin.includes('${new URL(url.base).host}')) {
              window.OhistoryReplaceState=window.history.replaceState,window.history.replaceState=(...t)=>{try{return window.OhistoryReplaceState.apply(window.history,t)}catch(e){console.log(e)}},window.OhistoryPushState=window.history.pushState,window.history.pushState=(...t)=>{try{return window.OhistoryPushState.apply(window.history,t)}catch(e){console.log(e)}};            
            }
          `,
        }}
      />
    </>
  );
};
