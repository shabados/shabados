import { component$, useStyles$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import styles from './app.css?inline'

export const head: DocumentHead = {
  title: 'PWA - Shabad OS',
  meta: [
    {
      name: 'description',
      content: 'Landing page for exploring a PWA of Shabad OS',
    },
  ],
}

export default component$(() => {
  useStyles$(styles)
  return (
    <div>
      <article>
        <h1>App</h1>
        <p>
          Please note that this space is being used for an experimental web app.
          If you're looking for the stable app that is released on desktop, then
          please see{' '}
          <a href='/support/install-shabad-os-presenter'>
            the installer guide for Presenter
          </a>{' '}
          instead.
        </p>
        <hr />
        <p>
          As we continue developing our mobile app, it made sense to explore a
          simple web app. Modern websites can be installed as a progressive web
          app (PWA), and this area of our website is a space to test these new
          technologies. For now there is only a way to read nitnem (with a
          romanized pronunciation guide and English translation), but we look
          forward to adding more in the future. This will let us try out all the
          features we would like in a PWA and make sure it is feasible to
          continue down this path. The goal is to enable desktop users to
          interact with Shabad OS from a web browser on multiple platforms.
        </p>
      </article>
      <div class='carousel'>
        <div class='carousel__title'>
          <h2>Nitnem (Morning)</h2>
        </div>
        <div class='cards'>
          <a class='card' href='jap-ji-sahib'>
            <p>
              <b>ਜਪੁ ਜੀ ਸਾਹਿਬ</b>
            </p>
            <p>
              <i>Jap Jī Sāhib</i>
            </p>
            <p>Meditate</p>
          </a>
          <a class='card' href='jap-sahib'>
            <p>
              <b>ਜਾਪੁ ਸਾਹਿਬ</b>
            </p>
            <p>
              <i>Jāp Sāhib</i>
            </p>
            <p>Meditations</p>
          </a>
          <a class='card' href='twa-prasad-swaye'>
            <p>
              <b>ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ</b>
            </p>
            <p>
              <i>Twa-Prasād Swaye</i>
            </p>
            <p>In praise of your grace</p>
          </a>
          <a class='card' href='kabyo-bac-benti-copai'>
            <p>
              <b>ਕਬ꠵ਯੋ ਬਾਚ ਬੇਨਤੀ - ਚੌਪਈ</b>
            </p>
            <p>
              <i>Kabyo Bāc Bentī Cōpaī</i>
            </p>
            <p>Spiritual safety and defense</p>
          </a>
          <a class='card' href='anand-sahib'>
            <p>
              <b>ਅਨੰਦੁ ਸਾਹਿਬ</b>
            </p>
            <p>
              <i>Anañd Sāhib</i>
            </p>
            <p>Bliss</p>
          </a>
        </div>
      </div>
      <div class='carousel'>
        <div class='carousel__title'>
          <h2>Nitnem (Evening & Night)</h2>
        </div>
        <div class='cards'>
          <a class='card' href='rehras-sahib'>
            <p>
              <b>ਰਹਰਾਸਿ ਸਾਹਿਬ</b>
            </p>
            <p>
              <i>Rēhrās Sāhib</i>
            </p>
            <p>Rules and customs</p>
          </a>
          <a class='card' href='kirtan-sohila'>
            <p>
              <b>ਕੀਰਤਨ ਸੋਹਿਲਾ</b>
            </p>
            <p>
              <i>Kīrtan Sohilā</i>
            </p>
            <p>Song of Praise</p>
          </a>
        </div>
      </div>
      <div class='carousel'>
        <div class='carousel__title'>
          <h2>Ardas</h2>
        </div>
        <div class='cards'>
          <a class='card' href='ardas'>
            <p>
              <b>ਅਰਦਾਸ</b>
            </p>
            <p>
              <i>Ardās</i>
            </p>
            <p>A humble aspiration</p>
          </a>
        </div>
      </div>
    </div>
  )
})
