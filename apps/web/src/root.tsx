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
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap'
          rel='stylesheet'
        />
        <RouterHead />
        <script
          dangerouslySetInnerHTML={`

            const controlsStore = JSON.parse(localStorage.getItem('controlsStore')) || {};

            // must match same in lib/zoomValues.ts
            const zoomValues = [0.75, 0.875, 1, 1.125, 1.25, 1.375, 1.5, 1.675, 1.75, 1.875, 2, 2.5, 3, 3.5, 4, 5, 6];

            // must match defaults in (app)/layout.tsx
            document.documentElement.style.fontSize = controlsStore.zoom ? zoomValues[controlsStore.zoom] + 'em' : '1.25em';
            document.documentElement.setAttribute('data-factor', controlsStore.factor ?? '150');
            document.documentElement.setAttribute('data-mode', controlsStore.mode ?? 'reader');
            document.documentElement.setAttribute('data-width', controlsStore.width ?? 'wider');
            document.documentElement.setAttribute('data-centered', controlsStore.centered ?? '1');
            document.documentElement.setAttribute('data-larivar', controlsStore.larivaar ?? '0');
            document.documentElement.setAttribute('data-vishraman', controlsStore.vishraman ?? '1');
            document.documentElement.setAttribute('data-appearance', controlsStore.appearance ?? 'auto');

            if (controlsStore.appearance === 'dark') {
              document
                .querySelector(
                  'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
                )
                .setAttribute('content', '#000000');
            };
            if (controlsStore.appearance === 'light') {
              document
                .querySelector(
                  'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
                )
                .setAttribute('content', '#f5f3f0');
            };

            const path = new URL(window.location.href).pathname;
            if (path == '/') {
              document.documentElement.style.fontSize = '1em';
              document.documentElement.setAttribute('data-width', 'base');
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
