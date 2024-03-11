/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script';
import { FC } from 'react';

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
        __html:
          'var update=function(){if (window.vevetApp) { return; } var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight;document.documentElement.style.setProperty("--vw",e/100+"px"),document.documentElement.style.setProperty("--vh",t/100+"px"),document.documentElement.style.setProperty("--vr",Math.sqrt(e**2+t**2)/2/100+"px")};window.addEventListener("resize",update),update();',
      }}
    />
  </>
);
