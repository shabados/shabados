import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './app.css?inline';

export const head: DocumentHead = {
  title: 'PWA - Shabad OS',
  meta: [
    {
      name: 'description',
      content: 'Landing page for exploring a PWA of Shabad OS',
    },
  ],
};

export default component$(() => {
  useStyles$(styles);
  return (
    <div>
      <article>
        <p>
          Please note that this is an experimental web app. If you're looking
          for the stable app, released for desktop, then please see:
        </p>
        <p>
          <a href='/support/install-shabad-os-presenter'>
            How to Install Shabad OS Presenter (Desktop)
          </a>
        </p>
        <hr />
      </article>
      <div>
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
    </div>
  );
});
