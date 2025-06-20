import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useNavigate, type DocumentHead, Form } from '@builder.io/qwik-city';
import styles from './index.css?inline';
import Spinner from '~/components/spinner/spinner';
import handleJump from '~/lib/handleJump';
import { getLocalStorage } from '../layout';
import toGurmukhiNumerals from '~/lib/toGurmukhiNumerals';
import { addHistoryItem } from '~/lib/localStorage';

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

  const quickLinks = [
    {
      title: 'ਜਪੁ ਜੀ ਸਾਹਿਬ',
      path: '/jap-ji-sahib/',
    },
    {
      title: 'ਰਹਰਾਸਿ ਸਾਹਿਬ',
      path: '/rehras-sahib/',
    },
    {
      title: 'ਕੀਰਤਨ ਸੋਹਿਲਾ',
      path: '/kirtan-sohila/',
    },
  ];

  const currentAng = useSignal('0');
  useVisibleTask$(() => {
    currentAng.value = getLocalStorage('userDataStore')['ang'] ?? '0';
  });

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
                {quickLinks.map((link) => (
                  <a
                    class='card'
                    key={link.path}
                    href={link.path}
                    onClick$={() =>
                      addHistoryItem(link.path, {
                        title: link.title,
                      })
                    }
                  >
                    <p>{link.title}</p>
                  </a>
                ))}
                <a
                  class='card'
                  href={
                    parseInt(currentAng.value) > 0
                      ? '/sggs/' + currentAng.value
                      : '#'
                  }
                  preventdefault:click={parseInt(currentAng.value) == 0}
                  onClick$={() =>
                    parseInt(currentAng.value) == 0 && handleJump('sggs', 1430)
                  }
                >
                  {parseInt(currentAng.value) > 0 ? (
                    <p>ਅੰਗ {toGurmukhiNumerals(currentAng.value)}</p>
                  ) : (
                    <p>ਅੰਗ ਤੇ ਜਾਓ...</p>
                  )}
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
                  <a class='card' href='/anand-sahib-salok'>
                    <p>ਅਨੰਦੁ ਸਾਹਿਬ (੬ ਪਉੜੀਆਂ)</p>
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
                <a class='card' href='/sukhmani-sahib/1'>
                  <p>ਅਸਟਪਦੀ ੧</p>
                </a>
                <a class='card' href='/sukhmani-sahib/2'>
                  <p>੨</p>
                </a>
                <a class='card' href='/sukhmani-sahib/3'>
                  <p>੩</p>
                </a>
                <a class='card' href='/sukhmani-sahib/4'>
                  <p>੪</p>
                </a>
                <a class='card' href='/sukhmani-sahib/5'>
                  <p>੫</p>
                </a>
                <a class='card' href='/sukhmani-sahib/6'>
                  <p>੬</p>
                </a>
                <a class='card' href='/sukhmani-sahib/7'>
                  <p>੭</p>
                </a>
                <a class='card' href='/sukhmani-sahib/8'>
                  <p>੮</p>
                </a>
                <a class='card' href='/sukhmani-sahib/9'>
                  <p>੯</p>
                </a>
                <a class='card' href='/asasukhmani-sahib10'>
                  <p>੧੦</p>
                </a>
                <a class='card' href='/asasukhmani-sahib11'>
                  <p>੧੧</p>
                </a>
                <a class='card' href='/asasukhmani-sahib12'>
                  <p>੧੨</p>
                </a>
                <a class='card' href='/asasukhmani-sahib13'>
                  <p>੧੩</p>
                </a>
                <a class='card' href='/asasukhmani-sahib14'>
                  <p>੧੪</p>
                </a>
                <a class='card' href='/asasukhmani-sahib15'>
                  <p>੧੫</p>
                </a>
                <a class='card' href='/asasukhmani-sahib16'>
                  <p>੧੬</p>
                </a>
                <a class='card' href='/asasukhmani-sahib17'>
                  <p>੧੭</p>
                </a>
                <a class='card' href='/asasukhmani-sahib18'>
                  <p>੧੮</p>
                </a>
                <a class='card' href='/asasukhmani-sahib19'>
                  <p>੧੯</p>
                </a>
                <a class='card' href='/asasukhmani-sahib20'>
                  <p>੨੦</p>
                </a>
                <a class='card' href='/asasukhmani-sahib21'>
                  <p>੨੧</p>
                </a>
                <a class='card' href='/asasukhmani-sahib22'>
                  <p>੨੨</p>
                </a>
                <a class='card' href='/asasukhmani-sahib23'>
                  <p>੨੩</p>
                </a>
                <a class='card' href='/asasukhmani-sahib24'>
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
                    href={
                      parseInt(currentAng.value) > 0
                        ? '/sggs/' + currentAng.value
                        : '#'
                    }
                    preventdefault:click={parseInt(currentAng.value) == 0}
                    onClick$={() =>
                      parseInt(currentAng.value) == 0 &&
                      handleJump('sggs', 1430)
                    }
                  >
                    {parseInt(currentAng.value) > 0 ? (
                      <p>ਅੰਗ {toGurmukhiNumerals(currentAng.value)}</p>
                    ) : (
                      <p>ਅੰਗ ਤੇ ਜਾਓ...</p>
                    )}
                  </a>
                  <a class='card' href='/sggs-bhog'>
                    <p>ਭੋਗ - ਸਲੋਕ ਮਹਲਾ ੯</p>
                  </a>
                  <a class='card' href='/ragmala'>
                    <p>ਰਾਗਮਾਲਾ</p>
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

            <div>
              <div class='carousel'>
                <div class='cards'>
                  <p class='card'>ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ਬਾਣੀਕਾਰ</p>
                  <a class='card' href='/guru-nanak'>
                    <p>ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ</p>
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
          <a href='/about'>About</a>
          <a href='/blog'>Blog</a>
          <a href='/support'>Support</a>
          <a href='/docs'>Docs</a>
          <a href='/privacy'>Privacy</a>
        </div>
      </article>
    </div>
  );
});
