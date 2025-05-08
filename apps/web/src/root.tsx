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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap'
          rel='stylesheet'
        />
        <RouterHead />
        <script
          dangerouslySetInnerHTML={`
            document.documentElement.setAttribute('data-mode', localStorage.controlsMode || 'classic');
            document.documentElement.setAttribute('data-width', localStorage.controlsWidth || 'base');
            document.documentElement.setAttribute('data-centered', localStorage.controlsCentered || '1');
            document.documentElement.setAttribute('data-vishraman', localStorage.controlsVishraman || '1');
            document.documentElement.setAttribute('data-larivar', localStorage.controlsLarivar || '0');
            // must match same in lib/zoomValues.ts
            const zoomValues = [0.75, 0.875, 1, 1.125, 1.25, 1.375, 1.5, 1.675, 1.75, 1.875, 2, 2.5, 3, 3.5, 4, 5, 6];
            document.documentElement.style.fontSize = localStorage.controlsZoom ? zoomValues[localStorage.controlsZoom] + 'em' : '1em';
            document.documentElement.setAttribute('data-factor', localStorage.controlsFactor || '1.5');
            document.documentElement.setAttribute('data-appearance', localStorage.controlsAppearance || 'auto');
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
