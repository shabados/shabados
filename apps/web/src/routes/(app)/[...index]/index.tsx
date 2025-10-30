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
import toGurmukhiNumerals from '~/lib/toGurmukhiNumerals';
import { addHistoryItem, getLocalStorage } from '~/lib/localStorage';
import Lotus from '~/components/icons/lotus';
import Search from '~/components/icons/ui/search';

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
  if (platform === 'other') {
    window.location.href = installUrl;
    return;
  }

  try {
    // attempt api call
    const res = await fetch(
      `https://api.github.com/repos/shabados/presenter/releases/latest`,
    );
    const data = await res.json();
    const version = data.name;
    console.log('Latest version:', version);
    if (version !== undefined) {
      // prettier-ignore
      const downloadUrl = `https://github.com/shabados/presenter/releases/download/v${version}/Shabad.OS-${platform == 'mac' ? `${version}.dmg` : `Setup-${version}.exe`}`
      window.location.href = downloadUrl;
      setTimeout(() => (window.location.href = installUrl), 3250);
    } else throw new Error('Version undefined');
  } catch {
    // if api call fails, redirect to install guide
    window.location.href = installUrl;
  }
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
    <div class='ui'>
      <div class='hero'>
        <div class='logo'>
          <div class='lotus'>
            <Lotus />
          </div>
          <span>Shabad OS</span>
        </div>
        <article class='searcharea'>
          <Form
            onSubmitCompleted$={async () =>
              await nav(`/search/${searchInput.value.substring(0, 4)}`)
            }
          >
            <input
              class='search'
              type='search'
              placeholder='Search'
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
            <div class='search-button'>
              <Search />
            </div>
          </Form>
        </article>
        <div>
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
                  {Array.from(Array(23)).map((_, i) => (
                    <a
                      key={`asa-ki-var-${i + 2}`}
                      class='card'
                      href={`/asa-ki-var/${i + 2}`}
                    >
                      <p>{toGurmukhiNumerals((i + 2).toString())}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div class='carousel'>
              <div class='cards'>
                <p class='card'>ਸੁਖਮਨੀ ਸਾਹਿਬ</p>
                <a class='card' href='/sukhmani-sahib/1'>
                  <p>ਅਸਟਪਦੀ ੧</p>
                </a>
                {Array.from(Array(23)).map((_, i) => (
                  <a
                    key={`sukhmani-sahib-${i + 2}`}
                    class='card'
                    href={`/sukhmani-sahib/${i + 2}`}
                  >
                    <p>{toGurmukhiNumerals((i + 2).toString())}</p>
                  </a>
                ))}
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
        <div class='continue'>
          <div class='button'>
            <span>Personal Sehaj Path</span>
            <span>ਅੰਗ ੪੨ - ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ</span>
          </div>
        </div>
        <article class='quick-picks'>
          <p>ਅਨੰਦੁ ਸਾਹਿਬ (੬ ਪਉੜੀਆਂ)</p>
          <p>ਖਸਮੁ ਧਿਆਈ ਇਕ ਮਨਿ ਇਕ ਭਾਇ</p>
          <p>ਜਮ ਕਾ ਮਾਰਗੁ ਦ੍ਰਿਸਟਿ ਨ ਆਇਆ</p>
          <p>ਜੋ ਮਾਗਹਿ ਠਾਕੁਰ ਅਪੁਨੇ ਤੇ ਸੋਈ ਸੋਈ ਦੇਵੈ</p>
          <p>ਛੱਕਾ ੨੨ - ਆਸਾ ਕੀ ਵਾਰ</p>
        </article>
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
