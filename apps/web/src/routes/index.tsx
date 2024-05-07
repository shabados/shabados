import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Spinner from '~/components/spinner/spinner';
import DatabaseHero from '~/components/svg/database-hero';
import ViewerHero from '~/components/svg/viewer-hero';
import styles from './index.css?inline';

export const head: DocumentHead = {
  title: 'Shabad OS',
  meta: [
    {
      name: 'description',
      content: 'Learn about shabad',
    },
  ],
};

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

export default component$(() => {
  useStyles$(styles);

  const downloading = useSignal(false);

  return (
    <>
      <section class='presenter'>
        <article>
          <div>
            <h1>Presenter</h1>
            <h2>
              Striving to be more simple, efficient, and powerful than ever.
            </h2>
          </div>
          <div>
            <a
              class={downloading.value ? 'loader' : 'button'}
              href='/support/install-shabad-os-presenter/'
              draggable={false}
              preventdefault:click
              onClick$={() => {
                downloading.value = !downloading.value;
                download();
              }}
            >
              {downloading.value ? <Spinner /> : 'Download'}
            </a>
          </div>
          <img src='/media/live-search.gif' alt='Gif of live search' />
        </article>
      </section>
      <section class='database'>
        <article>
          <div>
            <h1>Database</h1>
            <h2>
              Multiple Sources. Multiple Reviewers. Single Source of Truth.
            </h2>
          </div>
          <p>
            <a href='/docs/database' class='button' draggable={false}>
              Learn more
            </a>
          </p>
          <DatabaseHero />
        </article>
      </section>
      <section class='viewer'>
        <article>
          <div>
            <h1>Viewer</h1>
            <h2>
              Drill down to each line to read expositions and translations.
            </h2>
          </div>
          <p>
            <a
              href='/support/learn-how-to-proofread'
              class='button'
              draggable={false}
            >
              Learn to proofread
            </a>
          </p>
          <ViewerHero />
        </article>
      </section>
    </>
  );
});
