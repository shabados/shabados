import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  useNavigate,
  type DocumentHead,
  Form,
  Link,
} from '@builder.io/qwik-city';
import styles from './index.css?inline';
import Spinner from '~/components/spinner/spinner';
import handleJump from '~/lib/handleJump';

const getOS = () => {
  // window.navigator.platform is being deprecated, but it's successor userAgentData isn't prevalent yet
  const os = (
    window.navigator.platform ||
    (window.navigator as any).userAgentData.platform
  )
    .slice(0, 3)
    .toLowerCase();
  if (os == 'mac' || os == 'win') return os;
  else return 'other';
};

const download = async () => {
  // attempt to download for macOS / windows, regardless go to install guide
  const installUrl = '/support/install-shabad-os-presenter/';
  const platform = getOS();
  if (platform !== 'other') {
    // attempt api call
    const res = await fetch(
      `https://api.github.com/repos/shabados/presenter/releases/latest`,
    );
    const data = await res.json();
    const version = data.name;
    if (version !== undefined) {
      // prettier-ignore
      const downloadUrl = `https://github.com/shabados/presenter/releases/download/v${version}/Shabad.OS-${platform == 'mac'? `${version}.dmg`: `Setup-${version}.exe`}`
      window.location.href = downloadUrl;
    }
    // don't make the user wait more than 5 seconds to try and download (either it starts or it doesn't, the guide will explain how to download manually)
    setTimeout(() => {
      window.location.href = installUrl;
    }, 5000);
  } else window.location.href = installUrl;
};

export const head: DocumentHead = {
  title: 'Shabad OS',
  meta: [
    {
      name: 'description',
      content: 'Learn about shabad',
    },
  ],
};

export default component$(() => {
  useStyles$(styles);
  const nav = useNavigate();
  const downloading = useSignal(false);
  const searchInput = useSignal('');
  const shortListRef = useSignal<HTMLDivElement>();
  const fullListRef = useSignal<HTMLDivElement>();
  const searchTipRef = useSignal<HTMLParagraphElement>();
  const searchInputRef = useSignal<HTMLInputElement>();

  return (
    <div class='ui no-wide'>
      <div class='hero'>
        <div>
          <article>
            <Form
              onSubmitCompleted$={async () =>
                await nav(`/search/${searchInput.value.substring(0, 4)}`)
              }
            >
              <input
                class='search'
                type='search'
                placeholder='Search Shabad OS'
                maxLength={4}
                minLength={1}
                spellcheck={false}
                autoFocus={true}
                autoCorrect='off'
                autoCapitalize='none'
                autoComplete='off'
                ref={searchInputRef}
                onChange$={(_, el) => (searchInput.value = el.value)}
              />
            </Form>
            <p class='search-tip small' ref={searchTipRef}>
              Tip: To find "ਸਤਿਗੁਰੁ ਹੋਇ ਦਇਆਲੁ ਨ ਕਬਹੂੰ ਝੂਰੀਐ", try searching the
              heavy pause with first-letter gurbani or pronunciation. For
              example "ਸਹਦ", "ਨਕਝ", "shd", or "nkj".
            </p>
          </article>
          <div class='short-list' ref={shortListRef}>
            <div class='carousel'>
              <div class='cards'>
                <a class='card' href='/jap-ji-sahib'>
                  <p>ਜਪੁ ਜੀ ਸਾਹਿਬ</p>
                </a>
                <a class='card' href='/rehras-sahib'>
                  <p>ਰਹਰਾਸਿ ਸਾਹਿਬ</p>
                </a>
                <a class='card' href='/kirtan-sohila'>
                  <p>ਕੀਰਤਨ ਸੋਹਿਲਾ</p>
                </a>
                <a
                  class='card'
                  href='#'
                  preventdefault:click
                  onClick$={() => handleJump('sggs', 1430)}
                >
                  <p>ਅੰਗ ਤੇ ਜਾਓ...</p>
                </a>
                <a
                  class='card'
                  href='#'
                  onClick$={() => {
                    searchTipRef.value!.innerHTML =
                      'Tip: To scroll horizontally without a trackpad, hold the shift key while scrolling the mousewheel.';
                    shortListRef.value!.style.display = 'none';
                    fullListRef.value!.style.display = 'block';
                    searchInputRef.value!.blur();
                    searchInputRef.value!.focus();
                  }}
                >
                  <p>More</p>
                </a>
              </div>
            </div>
          </div>
          <div class='full-list' ref={fullListRef}>
            <div>
              <div class='carousel'>
                <div class='cards'>
                  <a class='card' href='/jap-ji-sahib'>
                    <p>ਜਪੁ ਜੀ ਸਾਹਿਬ</p>
                  </a>
                  <a class='card' href='/jap-sahib'>
                    <p>ਜਾਪੁ ਸਾਹਿਬ</p>
                  </a>
                  <a class='card' href='/twa-prasad-swaye'>
                    <p>ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ</p>
                  </a>
                  <a class='card' href='/kabyo-bac-benti-copai'>
                    <p>ਕਬ︀︁ਯੋ ਬਾਚ ਬੇਨਤੀ - ਚੌਪਈ</p>
                  </a>
                  <a class='card' href='/anand-sahib'>
                    <p>ਅਨੰਦੁ ਸਾਹਿਬ</p>
                  </a>
                </div>
              </div>
              <div class='carousel'>
                <div class='cards'>
                  <a class='card' href='/rehras-sahib'>
                    <p>ਰਹਰਾਸਿ ਸਾਹਿਬ</p>
                  </a>
                  <a class='card' href='/kirtan-sohila'>
                    <p>ਕੀਰਤਨ ਸੋਹਿਲਾ</p>
                  </a>
                </div>
              </div>
              <div class='carousel'>
                <div class='cards'>
                  <a class='card' href='/ardas'>
                    <p>ਅਰਦਾਸ</p>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div class='carousel'>
                <div class='cards'>
                  <p class='card'>ਆਸਾ ਕੀ ਵਾਰ</p>
                  <a class='card' href='/asa-ki-var/1'>
                    <p>ਛੱਕਾ ੧</p>
                  </a>
                  <a class='card' href='/asa-ki-var/2'>
                    <p>੨</p>
                  </a>
                  <a class='card' href='/asa-ki-var/3'>
                    <p>੩</p>
                  </a>
                  <a class='card' href='/asa-ki-var/4'>
                    <p>੪</p>
                  </a>
                  <a class='card' href='/asa-ki-var/5'>
                    <p>੫</p>
                  </a>
                  <a class='card' href='/asa-ki-var/6'>
                    <p>੬</p>
                  </a>
                  <a class='card' href='/asa-ki-var/7'>
                    <p>੭</p>
                  </a>
                  <a class='card' href='/asa-ki-var/8'>
                    <p>੮</p>
                  </a>
                  <a class='card' href='/asa-ki-var/9'>
                    <p>੯</p>
                  </a>
                  <a class='card' href='/asa-ki-var/10'>
                    <p>੧੦</p>
                  </a>
                  <a class='card' href='/asa-ki-var/11'>
                    <p>੧੧</p>
                  </a>
                  <a class='card' href='/asa-ki-var/12'>
                    <p>੧੨</p>
                  </a>
                  <a class='card' href='/asa-ki-var/13'>
                    <p>੧੩</p>
                  </a>
                  <a class='card' href='/asa-ki-var/14'>
                    <p>੧੪</p>
                  </a>
                  <a class='card' href='/asa-ki-var/15'>
                    <p>੧੫</p>
                  </a>
                  <a class='card' href='/asa-ki-var/16'>
                    <p>੧੬</p>
                  </a>
                  <a class='card' href='/asa-ki-var/17'>
                    <p>੧੭</p>
                  </a>
                  <a class='card' href='/asa-ki-var/18'>
                    <p>੧੮</p>
                  </a>
                  <a class='card' href='/asa-ki-var/19'>
                    <p>੧੯</p>
                  </a>
                  <a class='card' href='/asa-ki-var/20'>
                    <p>੨੦</p>
                  </a>
                  <a class='card' href='/asa-ki-var/21'>
                    <p>੨੧</p>
                  </a>
                  <a class='card' href='/asa-ki-var/22'>
                    <p>੨੨</p>
                  </a>
                  <a class='card' href='/asa-ki-var/23'>
                    <p>੨੩</p>
                  </a>
                  <a class='card' href='/asa-ki-var/24'>
                    <p>੨੪</p>
                  </a>
                </div>
              </div>
            </div>

            <div class='carousel'>
              <div class='cards'>
                <p class='card'>ਸੁਖਮਨੀ ਸਾਹਿਬ</p>
                <a
                  class='card'
                  href='/g/J9V,45C,ULS,L6T,H4B,SE7,K7X,1US,TF7?bani=sukhmani-sahib'
                >
                  <p>ਅਸਟਪਦੀ ੧</p>
                </a>
                <a
                  class='card'
                  href='/g/NF2,1MA,SFU,T0Y,B41,B7C,134,CYM,203?bani=sukhmani-sahib'
                >
                  <p>੨</p>
                </a>
                <a
                  class='card'
                  href='/g/KJL,GH5,2K2,JTS,LWT,Y5K,31D,MTW,N03?bani=sukhmani-sahib'
                >
                  <p>੩</p>
                </a>
                <a
                  class='card'
                  href='/g/BQV,N8F,4AY,234,DCL,9RE,1XQ,LG4,FNM?bani=sukhmani-sahib'
                >
                  <p>੪</p>
                </a>
                <a
                  class='card'
                  href='/g/3RK,V9T,7HP,FEC,AZT,AFT,DQX,74F,BKY?bani=sukhmani-sahib'
                >
                  <p>੫</p>
                </a>
                <a
                  class='card'
                  href='/g/9JH,HPD,K5M,CPG,RL2,2TM,HXF,AG4,FQA?bani=sukhmani-sahib'
                >
                  <p>੬</p>
                </a>
                <a
                  class='card'
                  href='/g/44E,ZJ4,JUG,KA7,MC8,CT2,CKH,GPX,EEW?bani=sukhmani-sahib'
                >
                  <p>੭</p>
                </a>
                <a
                  class='card'
                  href='/g/XWW,F5A,2AT,FJV,E5M,FN8,5TY,Q0G,LEB?bani=sukhmani-sahib'
                >
                  <p>੮</p>
                </a>
                <a
                  class='card'
                  href='/g/8NQ,DC7,34F,74B,0KE,C1A,6VR,6GA,38G?bani=sukhmani-sahib'
                >
                  <p>੯</p>
                </a>
                <a
                  class='card'
                  href='/g/YCP,51F,DC0,S6T,21R,B56,7CW,8LX,1RM?bani=sukhmani-sahib'
                >
                  <p>੧੦</p>
                </a>
                <a
                  class='card'
                  href='/g/EXR,1G1,QYL,3UK,5MP,EVF,KZ9,145,W3K?bani=sukhmani-sahib'
                >
                  <p>੧੧</p>
                </a>
                <a
                  class='card'
                  href='/g/V0T,X3L,NLN,VF0,E2G,HQ8,X3Z,7B6,LCF?bani=sukhmani-sahib'
                >
                  <p>੧੨</p>
                </a>
                <a
                  class='card'
                  href='/g/HY9,3D5,US1,1SX,NGH,L8Q,A9J,L3Z,D6S?bani=sukhmani-sahib'
                >
                  <p>੧੩</p>
                </a>
                <a
                  class='card'
                  href='/g/AS9,E75,B91,HJ0,GBE,0PM,427,FAE,8RL?bani=sukhmani-sahib'
                >
                  <p>੧੪</p>
                </a>
                <a
                  class='card'
                  href='/g/BJU,DN9,1NJ,3VX,A0H,KAM,JWW,14D,9GB?bani=sukhmani-sahib'
                >
                  <p>੧੫</p>
                </a>
                <a
                  class='card'
                  href='/g/BU7,FU9,NKQ,DAJ,FR3,14Y,HGR,1XZ,C8C?bani=sukhmani-sahib'
                >
                  <p>੧੬</p>
                </a>
                <a
                  class='card'
                  href='/g/K7M,HG7,5WT,7RW,VD9,H67,7MR,F8J,978?bani=sukhmani-sahib'
                >
                  <p>੧੭</p>
                </a>
                <a
                  class='card'
                  href='/g/5ZP,5X9,Q1Z,9GN,GA2,4P9,FJ4,D90,D4Y?bani=sukhmani-sahib'
                >
                  <p>੧੮</p>
                </a>
                <a
                  class='card'
                  href='/g/H70,C0F,ZXQ,EMF,8WW,51T,CX5,EFC,5TH?bani=sukhmani-sahib'
                >
                  <p>੧੯</p>
                </a>
                <a
                  class='card'
                  href='/g/MAH,B34,U7A,T4F,VD2,GDB,BAP,0NR,5HC?bani=sukhmani-sahib'
                >
                  <p>੨੦</p>
                </a>
                <a
                  class='card'
                  href='/g/5DQ,NJC,DSK,G19,JMS,DF6,8TF,ZT5,ZDG?bani=sukhmani-sahib'
                >
                  <p>੨੧</p>
                </a>
                <a
                  class='card'
                  href='/g/YGL,ASC,31M,2HY,FLU,UMU,YTV,VE0,00E?bani=sukhmani-sahib'
                >
                  <p>੨੨</p>
                </a>
                <a
                  class='card'
                  href='/g/6XE,NYQ,G60,SUZ,AU7,14J,2YE,VVN,5BY?bani=sukhmani-sahib'
                >
                  <p>੨੩</p>
                </a>
                <a
                  class='card'
                  href='/g/G4N,RR5,59B,9R6,EXD,VZR,S1R,DET,HVA?bani=sukhmani-sahib'
                >
                  <p>੨੪</p>
                </a>
              </div>
            </div>
            <div>
              <div class='carousel'>
                <div class='cards'>
                  <p class='card'>ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ</p>
                  <a class='card' href='/sggs/1'>
                    <p>ਆਰੰਬ - ਜਪੁ ਜੀ ਸਾਹਿਬ</p>
                  </a>
                  <a
                    class='card'
                    href='#'
                    preventdefault:click
                    onClick$={() => handleJump('sggs', 1430)}
                  >
                    <p>ਇਸ ਅੰਗ ਤੇ ਜਾਓ...</p>
                  </a>
                  <a class='card' href='/sggs/1426'>
                    <p>ਭੋਗ - ਸਲੋਕ ਮਹਲਾ ੯</p>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div class='carousel'>
                <div class='cards'>
                  <p class='card'>ਪਾਠ</p>
                  <a class='card' href='/sdgr/1'>
                    <p>ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ</p>
                  </a>
                  <a class='card' href='/gjnl/1'>
                    <p>ਗੰਜ ਨਾਮਾ</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <article class='footer'>
        <a
          class={`${downloading.value ? 'loader' : 'button'} download-button`}
          href='/support/install-shabad-os-presenter/'
          draggable={false}
          preventdefault:click
          onClick$={() => {
            if (downloading.value == false) download();
            downloading.value = true;
          }}
        >
          {downloading.value ? <Spinner /> : 'Download Presenter'}
        </a>
        <div class='footer-links'>
          <Link href='/about'>About</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/support'>Support</Link>
          <Link href='/docs'>Docs</Link>
          <Link href='/privacy'>Privacy</Link>
        </div>
      </article>
    </div>
  );
});
