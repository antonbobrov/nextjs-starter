/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { usePage } from '@/store/page/hooks';
import { removeDublicateSlashes } from '@anton.bobrov/react-hooks';
import Script from 'next/script';
import { FC } from 'react';

export const LayoutScriptsMicrodata: FC = () => {
  const { template, global, url, lexicon } = usePage();
  const { social } = global;

  if (template?.templateName !== 'Home') {
    return null;
  }

  return (
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
          logo: removeDublicateSlashes(`${url.base}/favicons/512x512.png`),
          sameAs: social.map(({ href }) => href),
        }),
      }}
    />
  );
};
