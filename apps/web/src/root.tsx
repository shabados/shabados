import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='#000000'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='#f5f3f0'
        />
        <meta name='theme-color' content='#f5f3f0' />
        <link rel='manifest' href='/app.webmanifest' />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/media/icon-16x16.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/media/icon-32x32.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/media/apple-touch-icon.png'
        />
        <RouterHead />
        <script
          dangerouslySetInnerHTML={`
            const path = new URL(window.location.href).pathname.split('/')[1];
            if (path == 'app') {
              document.documentElement.setAttribute('data-mode', localStorage.controlsMode || 'classic');
              document.documentElement.setAttribute('data-width', localStorage.controlsWidth || 'wider');
              document.documentElement.setAttribute('data-vishraman', localStorage.controlsVishraman || '1');
              document.documentElement.setAttribute('data-larivar', localStorage.controlsLarivar || '0');
              document.documentElement.style.fontSize = localStorage.controlsZoom ? localStorage.controlsZoom + 'em' : '1.5em';
            }
          `}
        />
      </head>
      <body lang='en'>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
