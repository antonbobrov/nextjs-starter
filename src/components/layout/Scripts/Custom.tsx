/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script';
import { FC } from 'react';
import { viewportCssVarsScript } from 'vevet';

export const LayoutScriptsCustom: FC = () => (
  <>
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
      id="js_viewport_css_vars"
      dangerouslySetInnerHTML={{
        __html: viewportCssVarsScript,
      }}
    />
  </>
);
