import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { ControlsContext } from '~/routes/layout-app';
import styles from './slideshow.css?inline';
import Line from '~/components/line/line';

interface LineProps {
  src: string;
  translation: string;
  pronunciation: string;
}

interface SlideshowProps {
  focusOnClose: HTMLElement;
}

export default component$<SlideshowProps>(({ focusOnClose }) => {
  useStylesScoped$(styles);
  const controlsStore = useContext(ControlsContext);

  const map: { [key: string]: LineProps } = {
    waheguru: {
      src: 'ਵਾਹਿਗੁਰੂ',
      pronunciation: 'wāhegurū',
      translation: 'Waheguru',
    },
    mulmantar: {
      src: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ; ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ',
      pronunciation:
        'ik oañkār sat nām kartā purakh nirbhau nirvēr; akāl mūrat ajūnī sēbhañ gur prasād',
      translation:
        "One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred. Image Of The Undying, Beyond Birth, Self-Existent. By Guru's Grace ~",
    },
    bsnssa: {
      src: 'ਬੋਲੇ ਸੋ ਨਿਹਾਲ; ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
      pronunciation: 'bole so nihāl; sat srī akāl',
      translation: 'Whoever says, transcends; Truth is the Timeless One!',
    },
    wjkk: {
      src: 'ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ; ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ',
      pronunciation: 'wāhegurū jī kā khālsā; wāhegurū jī kī fateh',
      translation: "Waheguru's pure, Waheguru's victory",
    },
  };
  const data = map[controlsStore.slideshowType] || {};

  return (
    <main
      class='slideshow'
      onClick$={() => {
        controlsStore.slideshow = 0;
        focusOnClose.focus();
      }}
    >
      <div>
        <article>
          <Line
            src={'src' in data ? data.src : ''}
            pronunciation={'src' in data ? data.pronunciation : ''}
            translation={'translation' in data ? data.translation : ''}
          />
        </article>
      </div>
      <p class='small slideshow__hint'>Press to exit slideshow</p>
    </main>
  );
});
