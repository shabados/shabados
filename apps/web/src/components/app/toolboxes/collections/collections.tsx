import {
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import ModalBg from '~/components/app/toolboxes-modal/modal-bg/modal-bg';
import Modal from '~/components/app/toolboxes-modal/modal/modal';
import handleJump from '~/lib/handleJump';
import toGurmukhiNumerals from '~/lib/toGurmukhiNumerals';
import { UiContext, UserDataContext } from '~/routes/(app)/layout';
import styles from './collections.css?inline';
import X from '~/components/icons/ui/x';

type Link = { label: string; href: string };

const NITNEM: Link[] = [
  { label: 'ਜਪੁ ਜੀ ਸਾਹਿਬ', href: '/jap-ji-sahib' },
  { label: 'ਜਾਪੁ ਸਾਹਿਬ', href: '/jap-sahib' },
  { label: 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ - ਸ੍ਵਯੇ', href: '/twa-prasad-swaye' },
  { label: 'ਕਬਿਯੋ ਬਾਚ ਬੇਨਤੀ - ਚੌਪਈ', href: '/kabyo-bac-benti-copai' },
  { label: 'ਅਨੰਦੁ ਸਾਹਿਬ', href: '/anand-sahib' },
  { label: 'ਰਹਰਾਸਿ ਸਾਹਿਬ', href: '/rehras-sahib' },
  { label: 'ਕੀਰਤਨ ਸੋਹਿਲਾ', href: '/kirtan-sohila' },
];

const MISC: Link[] = [
  { label: 'ਅਰਦਾਸ', href: '/ardas' },
  { label: 'ਅਨੰਦੁ ਸਾਹਿਬ (੬ ਪਉੜੀਆਂ)', href: '/anand-sahib-salok' },
];

const ASA_KI_VAR: Link[] = Array.from(Array(24), (_, i) => ({
  label: toGurmukhiNumerals((i + 1).toString()),
  href: `/asa-ki-var/${i + 1}`,
}));

const SUKHMANI_SAHIB: Link[] = Array.from(Array(24), (_, i) => ({
  label: toGurmukhiNumerals((i + 1).toString()),
  href: `/sukhmani-sahib/${i + 1}`,
}));

const PATH: Link[] = [
  { label: 'ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ', href: '/sdgr/1' },
  { label: 'ਗੰਜ ਨਾਮਾ', href: '/gjnl/1' },
];

const BANIKAR: Link[] = [{ label: 'ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ', href: '/guru-nanak' }];

type FolderConfig = { title: string; links: Link[]; grid?: string };

const FOLDER_CONFIGS: Record<string, FolderConfig> = {
  nitnem: { title: 'ਨਿਤਨੇਮ', links: NITNEM, grid: 'grid-1' },
  'asa-ki-var': { title: 'ਆਸਾ ਕੀ ਵਾਰ', links: ASA_KI_VAR, grid: 'grid-4' },
  'sukhmani-sahib': {
    title: 'ਸੁਖਮਨੀ ਸਾਹਿਬ',
    links: SUKHMANI_SAHIB,
    grid: 'grid-4',
  },
  path: { title: 'ਪਾਠ', links: PATH },
  banikar: { title: 'ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ਬਾਣੀਕਾਰ', links: BANIKAR },
};

export default component$(() => {
  useStylesScoped$(styles);
  const uiStore = useContext(UiContext);
  const userDataStore = useContext(UserDataContext);
  const folder = useSignal<string | null>(null);
  const ang = parseInt(userDataStore.ang);
  const folderConfig =
    folder.value && folder.value !== 'sggs'
      ? FOLDER_CONFIGS[folder.value]
      : null;

  return (
    <>
      <ModalBg store={uiStore} s={'collections'} />
      <Modal position='center'>
        <article class='modal__article'>
          {folder.value === null && (
            <>
              <div class='carousel'>
                <div class='cards'>
                  <a
                    href='#'
                    preventdefault:click={true}
                    class='card'
                    onClick$={() => (folder.value = 'nitnem')}
                  >
                    ਨਿਤਨੇਮ
                  </a>
                  <a
                    href='#'
                    preventdefault:click={true}
                    class='card'
                    onClick$={() => (folder.value = 'asa-ki-var')}
                  >
                    ਆਸਾ ਕੀ ਵਾਰ
                  </a>
                  <a
                    href='#'
                    preventdefault:click={true}
                    class='card'
                    onClick$={() => (folder.value = 'sukhmani-sahib')}
                  >
                    ਸੁਖਮਨੀ ਸਾਹਿਬ
                  </a>
                </div>
              </div>
              <div class='carousel'>
                <div class='cards'>
                  {MISC.map(({ label, href }) => (
                    <a key={href} class='card' href={href}>
                      <p>{label}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div class='carousel'>
                <div class='cards'>
                  <a
                    href='#'
                    preventdefault:click={true}
                    class='card'
                    onClick$={() => (folder.value = 'sggs')}
                  >
                    ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ
                  </a>
                  <a
                    class='card'
                    href='#'
                    preventdefault:click={true}
                    onClick$={() => handleJump('sggs', 1430)}
                  >
                    ਅੰਗ ਤੇ ਜਾਓ...
                  </a>
                  {ang > 0 && (
                    <a class='card' href={'/sggs/' + ang}>
                      <p>{`ਅੰਗ ${toGurmukhiNumerals(userDataStore.ang)}`}</p>
                    </a>
                  )}
                </div>
              </div>
              <div class='carousel'>
                <div class='cards'>
                  {PATH.map(({ label, href }) => (
                    <a key={href} class='card' href={href}>
                      <p>{label}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div class='carousel'>
                <div class='cards'>
                  <a
                    href='#'
                    preventdefault:click={true}
                    class='card'
                    onClick$={() => (folder.value = 'banikar')}
                  >
                    ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ਬਾਣੀਕਾਰ
                  </a>
                </div>
              </div>
            </>
          )}
          {folder.value === 'sggs' && (
            <div class='carousel'>
              <div class='folder-header'>
                <p class='folder-title'>ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ</p>
                <a
                  href='#'
                  preventdefault:click={true}
                  class='close-btn'
                  onClick$={() => (folder.value = null)}
                >
                  ✕
                </a>
              </div>
              <div class='cards grid-1'>
                <a class='card' href='/sggs/1'>
                  <p>ਆਰੰਬ - ਜਪੁ ਜੀ ਸਾਹਿਬ</p>
                </a>
                <a class='card' href='/sggs-bhog'>
                  <p>ਭੋਗ - ਸਲੋਕ ਮਹਲਾ ੯</p>
                </a>
                <a class='card' href='/ragmala'>
                  <p>ਰਾਗਮਾਲਾ</p>
                </a>
              </div>
            </div>
          )}
          {folderConfig && (
            <div class='carousel'>
              <div class='folder-header'>
                <p class='folder-title'>{folderConfig.title}</p>
                <a
                  href='#'
                  preventdefault:click={true}
                  class='close-btn'
                  onClick$={() => (folder.value = null)}
                >
                  <X />
                </a>
              </div>
              <div
                class={
                  folderConfig.grid ? `cards ${folderConfig.grid}` : 'cards'
                }
              >
                {folderConfig.links.map(({ label, href }) => (
                  <a key={href} class='card' href={href}>
                    <p>{label}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>
      </Modal>
    </>
  );
});
