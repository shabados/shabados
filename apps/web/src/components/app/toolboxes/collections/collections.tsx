import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import ModalBg from '~/components/app/toolboxes-modal/modal-bg/modal-bg';
import Modal from '~/components/app/toolboxes-modal/modal/modal';
import handleJump from '~/lib/handleJump';
import toGurmukhiNumerals from '~/lib/toGurmukhiNumerals';
import { UiContext, UserDataContext } from '~/routes/(app)/layout';
import styles from './collections.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const uiStore = useContext(UiContext);
  const userDataStore = useContext(UserDataContext);

  return (
    <>
      <ModalBg store={uiStore} s={'collections'} />
      <Modal position='center'>
        <article class='modal__article'>
          <div class='carousel'>
            <div class='cards'>
              <p class='card'>ਨਿਤਨੇਮ</p>
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
          <div class='carousel'>
            <div class='cards'>
              <p class='card'>ਆਸਾ ਕੀ ਵਾਰ</p>
            </div>
            <div class='cards grid-6'>
              {Array.from(Array(24)).map((_, i) => (
                <a
                  key={`asa-ki-var-${i + 1}`}
                  class='card'
                  href={`/asa-ki-var/${i + 1}`}
                >
                  <p>{toGurmukhiNumerals((i + 1).toString())}</p>
                </a>
              ))}
            </div>
          </div>
          <div class='carousel'>
            <div class='cards'>
              <p class='card'>ਸੁਖਮਨੀ ਸਾਹਿਬ</p>
            </div>
            <div class='cards grid-6'>
              {Array.from(Array(24)).map((_, i) => (
                <a
                  key={`sukhmani-sahib-${i + 1}`}
                  class='card'
                  href={`/sukhmani-sahib/${i + 1}`}
                >
                  <p>{toGurmukhiNumerals((i + 1).toString())}</p>
                </a>
              ))}
            </div>
          </div>

          <div class='carousel'>
            <div class='cards'>
              <p class='card'>ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ</p>
              <a class='card' href='/sggs/1'>
                <p>ਆਰੰਬ - ਜਪੁ ਜੀ ਸਾਹਿਬ</p>
              </a>
              <a
                class='card'
                href={
                  parseInt(userDataStore.ang) > 0
                    ? '/sggs/' + userDataStore.ang
                    : '#'
                }
                preventdefault:click={parseInt(userDataStore.ang) == 0}
                onClick$={() =>
                  parseInt(userDataStore.ang) == 0 && handleJump('sggs', 1430)
                }
              >
                {parseInt(userDataStore.ang) > 0 ? (
                  <p>ਅੰਗ {toGurmukhiNumerals(userDataStore.ang)}</p>
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

          <div class='carousel'>
            <div class='cards'>
              <p class='card'>ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ਬਾਣੀਕਾਰ</p>
              <a class='card' href='/guru-nanak'>
                <p>ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ</p>
              </a>
            </div>
          </div>
        </article>
      </Modal>
    </>
  );
});
