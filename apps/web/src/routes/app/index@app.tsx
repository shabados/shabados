import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  useNavigate,
  type DocumentHead,
  Form,
  Link,
} from '@builder.io/qwik-city';
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
  const searchInput = useSignal('');
  const nav = useNavigate();
  return (
    <div class='ui'>
      <article>
        <h2>Search (Experimental)</h2>
        <Form
          onSubmitCompleted$={async () =>
            await nav(`/app/search/${searchInput.value.substring(0, 4)}`)
          }
        >
          <input
            type='search'
            maxLength={4}
            minLength={1}
            spellcheck={false}
            autoCorrect='off'
            autoCapitalize='none'
            autoComplete='off'
            onChange$={(_, el) => (searchInput.value = el.value)}
          />
        </Form>
        <p>
          Use first-letter gurbani or pronunciation. (E.g. try "ਸਹਦ", "ਨਕਝ",
          "shd", or "nkj" for "ਸਤਿਗੁਰੁ ਹੋਇ ਦਇਆਲੁ ਨ ਕਬਹੂੰ ਝੂਰੀਐ")
        </p>
      </article>
      <hr />
      <br />
      <div>
        <div class='carousel'>
          <div class='carousel__title'>
            <h2>ਨਿਤਨੇਮ (ਸਵੇਰ)</h2>
          </div>
          <div class='cards'>
            <a class='card' href='jap-ji-sahib'>
              <p>
                <b>ਜਪੁ ਜੀ ਸਾਹਿਬ</b>
              </p>
              <p class='small'>
                <i>jap jī sāhib</i>
              </p>
            </a>
            <a class='card' href='jap-sahib'>
              <p>
                <b>ਜਾਪੁ ਸਾਹਿਬ</b>
              </p>
              <p class='small'>
                <i>jāp sāhib</i>
              </p>
            </a>
            <a class='card' href='twa-prasad-swaye'>
              <p>
                <b>ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ</b>
              </p>
              <p class='small'>
                <i>twa-prasād swaye</i>
              </p>
            </a>
            <a class='card' href='kabyo-bac-benti-copai'>
              <p>
                <b>ਕਬ︀︁ਯੋ ਬਾਚ ਬੇਨਤੀ - ਚੌਪਈ</b>
              </p>
              <p class='small'>
                <i>kabyo bāc bentī cōpaī</i>
              </p>
            </a>
            <a class='card' href='anand-sahib'>
              <p>
                <b>ਅਨੰਦੁ ਸਾਹਿਬ</b>
              </p>
              <p class='small'>
                <i>anañd sāhib</i>
              </p>
            </a>
          </div>
        </div>
        <div class='carousel'>
          <div class='carousel__title'>
            <h2>ਨਿਤਨੇਮ (ਸ਼ਾਮ ਰਾਤ)</h2>
          </div>
          <div class='cards'>
            <a class='card' href='rehras-sahib'>
              <p>
                <b>ਰਹਰਾਸਿ ਸਾਹਿਬ</b>
              </p>
              <p class='small'>
                <i>rēhrās sāhib</i>
              </p>
            </a>
            <a class='card' href='kirtan-sohila'>
              <p>
                <b>ਕੀਰਤਨ ਸੋਹਿਲਾ</b>
              </p>
              <p class='small'>
                <i>kīrtan sohelā</i>
              </p>
            </a>
          </div>
        </div>
        <div class='carousel'>
          <div class='carousel__title'>
            <h2>ਅਰਦਾਸ</h2>
          </div>
          <div class='cards'>
            <a class='card' href='ardas'>
              <p>
                <b>ਅਰਦਾਸ</b>
              </p>
              <p class='small'>
                <i>ardās</i>
              </p>
            </a>
          </div>
        </div>
      </div>
      <div>
        <div class='carousel'>
          <h2 class='carousel__title'>ਆਸਾ ਕੀ ਵਾਰ</h2>
          <div class='cards'>
            <a class='card' href='/app/asa-ki-var/1'>
              <p>
                <b>ਛੱਕਾ 1</b>
              </p>
              <p class='small'>
                <i>chakkā 1</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/2'>
              <p>
                <b>ਛੱਕਾ 2</b>
              </p>
              <p class='small'>
                <i>chakkā 2</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/3'>
              <p>
                <b>ਛੱਕਾ 3</b>
              </p>
              <p class='small'>
                <i>chakkā 3</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/4'>
              <p>
                <b>ਛੱਕਾ 4</b>
              </p>
              <p class='small'>
                <i>chakkā 4</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/5'>
              <p>
                <b>ਛੱਕਾ 5</b>
              </p>
              <p class='small'>
                <i>chakkā 5</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/6'>
              <p>
                <b>ਛੱਕਾ 6</b>
              </p>
              <p class='small'>
                <i>chakkā 6</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/7'>
              <p>
                <b>ਛੱਕਾ 7</b>
              </p>
              <p class='small'>
                <i>chakkā 7</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/8'>
              <p>
                <b>ਛੱਕਾ 8</b>
              </p>
              <p class='small'>
                <i>chakkā 8</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/9'>
              <p>
                <b>ਛੱਕਾ 9</b>
              </p>
              <p class='small'>
                <i>chakkā 9</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/10'>
              <p>
                <b>ਛੱਕਾ 10</b>
              </p>
              <p class='small'>
                <i>chakkā 10</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/11'>
              <p>
                <b>ਛੱਕਾ 11</b>
              </p>
              <p class='small'>
                <i>chakkā 11</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/12'>
              <p>
                <b>ਛੱਕਾ 12</b>
              </p>
              <p class='small'>
                <i>chakkā 12</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/13'>
              <p>
                <b>ਛੱਕਾ 13</b>
              </p>
              <p class='small'>
                <i>chakkā 13</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/14'>
              <p>
                <b>ਛੱਕਾ 14</b>
              </p>
              <p class='small'>
                <i>chakkā 14</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/15'>
              <p>
                <b>ਛੱਕਾ 15</b>
              </p>
              <p class='small'>
                <i>chakkā 15</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/16'>
              <p>
                <b>ਛੱਕਾ 16</b>
              </p>
              <p class='small'>
                <i>chakkā 16</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/17'>
              <p>
                <b>ਛੱਕਾ 17</b>
              </p>
              <p class='small'>
                <i>chakkā 17</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/18'>
              <p>
                <b>ਛੱਕਾ 18</b>
              </p>
              <p class='small'>
                <i>chakkā 18</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/19'>
              <p>
                <b>ਛੱਕਾ 19</b>
              </p>
              <p class='small'>
                <i>chakkā 19</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/20'>
              <p>
                <b>ਛੱਕਾ 20</b>
              </p>
              <p class='small'>
                <i>chakkā 20</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/21'>
              <p>
                <b>ਛੱਕਾ 21</b>
              </p>
              <p class='small'>
                <i>chakkā 21</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/22'>
              <p>
                <b>ਛੱਕਾ 22</b>
              </p>
              <p class='small'>
                <i>chakkā 22</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/23'>
              <p>
                <b>ਛੱਕਾ 23</b>
              </p>
              <p class='small'>
                <i>chakkā 23</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/24'>
              <p>
                <b>ਛੱਕਾ 24</b>
              </p>
              <p class='small'>
                <i>chakkā 24</i>
              </p>
            </a>
          </div>
        </div>
      </div>
      <div>
        <div class='carousel'>
          <h2 class='carousel__title'>ਪਾਠ</h2>
          <div class='cards'>
            <a class='card' href='f/sggs/1'>
              <p>
                <b>ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ</b>
              </p>
              <p class='small'>
                <i>srī gurū granth sāhib jī</i>
              </p>
            </a>
            <a class='card' href='f/sdgr/1'>
              <p>
                <b>ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ</b>
              </p>
              <p class='small'>
                <i>srī dasam granth</i>
              </p>
            </a>
            <a class='card' href='f/gjnl/1'>
              <p>
                <b>ਗੰਜ ਨਾਮਾ</b>
              </p>
              <p class='small'>
                <i>ganj-nâme</i>
              </p>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <article>
        <h2>PWA</h2>
        <p>
          This Progressive Web App aims to slowly include any essential features
          of the Shabad OS Presenter app on desktop as a lite alternative to a
          full-featured mobile app. If you'd like to learn more or read support
          articles and developer docs for Shabad OS,{' '}
          <Link href='/'>
            please click here to go back to the main Shabad OS website.
          </Link>
        </p>
      </article>
    </div>
  );
});
