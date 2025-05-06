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
                <b>ਛੱਕਾ ੧</b>
              </p>
              <p class='small'>
                <i>chakkā 1</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/2'>
              <p>
                <b>ਛੱਕਾ ੨</b>
              </p>
              <p class='small'>
                <i>chakkā 2</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/3'>
              <p>
                <b>ਛੱਕਾ ੩</b>
              </p>
              <p class='small'>
                <i>chakkā 3</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/4'>
              <p>
                <b>ਛੱਕਾ ੪</b>
              </p>
              <p class='small'>
                <i>chakkā 4</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/5'>
              <p>
                <b>ਛੱਕਾ ੫</b>
              </p>
              <p class='small'>
                <i>chakkā 5</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/6'>
              <p>
                <b>ਛੱਕਾ ੬</b>
              </p>
              <p class='small'>
                <i>chakkā 6</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/7'>
              <p>
                <b>ਛੱਕਾ ੭</b>
              </p>
              <p class='small'>
                <i>chakkā 7</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/8'>
              <p>
                <b>ਛੱਕਾ ੮</b>
              </p>
              <p class='small'>
                <i>chakkā 8</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/9'>
              <p>
                <b>ਛੱਕਾ ੯</b>
              </p>
              <p class='small'>
                <i>chakkā 9</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/10'>
              <p>
                <b>ਛੱਕਾ ੧੦</b>
              </p>
              <p class='small'>
                <i>chakkā 10</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/11'>
              <p>
                <b>ਛੱਕਾ ੧੧</b>
              </p>
              <p class='small'>
                <i>chakkā 11</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/12'>
              <p>
                <b>ਛੱਕਾ ੧੨</b>
              </p>
              <p class='small'>
                <i>chakkā 12</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/13'>
              <p>
                <b>ਛੱਕਾ ੧੩</b>
              </p>
              <p class='small'>
                <i>chakkā 13</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/14'>
              <p>
                <b>ਛੱਕਾ ੧੪</b>
              </p>
              <p class='small'>
                <i>chakkā 14</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/15'>
              <p>
                <b>ਛੱਕਾ ੧੫</b>
              </p>
              <p class='small'>
                <i>chakkā 15</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/16'>
              <p>
                <b>ਛੱਕਾ ੧੬</b>
              </p>
              <p class='small'>
                <i>chakkā 16</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/17'>
              <p>
                <b>ਛੱਕਾ ੧੭</b>
              </p>
              <p class='small'>
                <i>chakkā 17</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/18'>
              <p>
                <b>ਛੱਕਾ ੧੮</b>
              </p>
              <p class='small'>
                <i>chakkā 18</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/19'>
              <p>
                <b>ਛੱਕਾ ੧੯</b>
              </p>
              <p class='small'>
                <i>chakkā 19</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/20'>
              <p>
                <b>ਛੱਕਾ ੨੦</b>
              </p>
              <p class='small'>
                <i>chakkā 20</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/21'>
              <p>
                <b>ਛੱਕਾ ੨੧</b>
              </p>
              <p class='small'>
                <i>chakkā 21</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/22'>
              <p>
                <b>ਛੱਕਾ ੨੨</b>
              </p>
              <p class='small'>
                <i>chakkā 22</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/23'>
              <p>
                <b>ਛੱਕਾ ੨੩</b>
              </p>
              <p class='small'>
                <i>chakkā 23</i>
              </p>
            </a>
            <a class='card' href='/app/asa-ki-var/24'>
              <p>
                <b>ਛੱਕਾ ੨੪</b>
              </p>
              <p class='small'>
                <i>chakkā 24</i>
              </p>
            </a>
          </div>
        </div>
      </div>

      <div class='carousel'>
        <h2 class='carousel__title'>ਸੁਖਮਨੀ ਸਾਹਿਬ</h2>
        <div class='cards'>
          <a
            class='card'
            href='/app/g/J9V,45C,ULS,L6T,H4B,SE7,K7X,1US,TF7?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧</b>
            </p>
            <p class='small'>
              <i>ashtpadi 1</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/NF2,1MA,SFU,T0Y,B41,B7C,134,CYM,203?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੨</b>
            </p>
            <p class='small'>
              <i>ashtpadi 2</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/KJL,GH5,2K2,JTS,LWT,Y5K,31D,MTW,N03?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੩</b>
            </p>
            <p class='small'>
              <i>ashtpadi 3</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/BQV,N8F,4AY,234,DCL,9RE,1XQ,LG4,FNM?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੪</b>
            </p>
            <p class='small'>
              <i>ashtpadi 4</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/3RK,V9T,7HP,FEC,AZT,AFT,DQX,74F,BKY?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੫</b>
            </p>
            <p class='small'>
              <i>ashtpadi 5</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/9JH,HPD,K5M,CPG,RL2,2TM,HXF,AG4,FQA?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੬</b>
            </p>
            <p class='small'>
              <i>ashtpadi 6</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/44E,ZJ4,JUG,KA7,MC8,CT2,CKH,GPX,EEW?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੭</b>
            </p>
            <p class='small'>
              <i>ashtpadi 7</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/XWW,F5A,2AT,FJV,E5M,FN8,5TY,Q0G,LEB?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੮</b>
            </p>
            <p class='small'>
              <i>ashtpadi 8</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/8NQ,DC7,34F,74B,0KE,C1A,6VR,6GA,38G?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੯</b>
            </p>
            <p class='small'>
              <i>ashtpadi 9</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/YCP,51F,DC0,S6T,21R,B56,7CW,8LX,1RM?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੦</b>
            </p>
            <p class='small'>
              <i>ashtpadi 10</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/EXR,1G1,QYL,3UK,5MP,EVF,KZ9,145,W3K?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੧</b>
            </p>
            <p class='small'>
              <i>ashtpadi 11</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/V0T,X3L,NLN,VF0,E2G,HQ8,X3Z,7B6,LCF?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੨</b>
            </p>
            <p class='small'>
              <i>ashtpadi 12</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/HY9,3D5,US1,1SX,NGH,L8Q,A9J,L3Z,D6S?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੩</b>
            </p>
            <p class='small'>
              <i>ashtpadi 13</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/AS9,E75,B91,HJ0,GBE,0PM,427,FAE,8RL?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੪</b>
            </p>
            <p class='small'>
              <i>ashtpadi 14</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/BJU,DN9,1NJ,3VX,A0H,KAM,JWW,14D,9GB?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੫</b>
            </p>
            <p class='small'>
              <i>ashtpadi 15</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/BU7,FU9,NKQ,DAJ,FR3,14Y,HGR,1XZ,C8C?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੬</b>
            </p>
            <p class='small'>
              <i>ashtpadi 16</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/K7M,HG7,5WT,7RW,VD9,H67,7MR,F8J,978?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੭</b>
            </p>
            <p class='small'>
              <i>ashtpadi 17</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/5ZP,5X9,Q1Z,9GN,GA2,4P9,FJ4,D90,D4Y?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੮</b>
            </p>
            <p class='small'>
              <i>ashtpadi 18</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/H70,C0F,ZXQ,EMF,8WW,51T,CX5,EFC,5TH?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੧੯</b>
            </p>
            <p class='small'>
              <i>ashtpadi 19</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/MAH,B34,U7A,T4F,VD2,GDB,BAP,0NR,5HC?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੨੦</b>
            </p>
            <p class='small'>
              <i>ashtpadi 20</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/5DQ,NJC,DSK,G19,JMS,DF6,8TF,ZT5,ZDG?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੨੧</b>
            </p>
            <p class='small'>
              <i>ashtpadi 21</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/YGL,ASC,31M,2HY,FLU,UMU,YTV,VE0,00E?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੨੨</b>
            </p>
            <p class='small'>
              <i>ashtpadi 22</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/6XE,NYQ,G60,SUZ,AU7,14J,2YE,VVN,5BY?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੨੩</b>
            </p>
            <p class='small'>
              <i>ashtpadi 23</i>
            </p>
          </a>
          <a
            class='card'
            href='/app/g/G4N,RR5,59B,9R6,EXD,VZR,S1R,DET,HVA?bani=sukhmani-sahib'
          >
            <p>
              <b>ਅਸਟਪਦੀ ੨੪</b>
            </p>
            <p class='small'>
              <i>ashtpadi 24</i>
            </p>
          </a>
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
