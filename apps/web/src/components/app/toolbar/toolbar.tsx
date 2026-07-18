import { component$, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { UiContext } from '~/routes/(app)/layout';
import Toolbox from '../toolbox/toolbox';
import styles from './toolbar.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const uiStore = useContext(UiContext);

  return (
    <div
      class={`toolbar__container ${uiStore.scrollForward && 'hide'} ${
        uiStore.search && 'search'
      } scrolled`}
    >
      <Toolbox active />
      {/* <Toolbox title={'ਖਸਮੁ ਧਿਆਈ ਇਕ ਮਨਿ ਇਕ ਭਾਇ'} titleOnly /> */}
      {/* <Toolbox title={'ਅਸਟਪਦੀ ੨੪ - ਸੁਖਮਨੀ ਸਾਹਿਬ'} titleOnly /> */}
      {/* <Toolbox title={'ਛੱਕਾ ੨੦ - ਆਸਾ ਕੀ ਵਾਰ'} titleOnly /> */}
    </div>
  );
});
