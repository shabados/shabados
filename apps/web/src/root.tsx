import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from './components/router-head/router-head'

import './global.css'

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
          content='#2b1d22'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='#e0dadc'
        />
        <meta name='theme-color' content='#e0dadc' />
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
        <script defer src='/_vercel/insights/script.js'></script>
      </head>
      <body lang='en'>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  )
})
