import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { type ToolboxKey } from '~/lib/toggleToolbox';
import styles from './modal-bg.css?inline';
import { type Ui } from '~/routes/(app)/layout';

type Props = {
  store: Ui;
  s: ToolboxKey;
  type?: 'default' | 'search';
};

export default component$<Props>(({ store, s, type = 'default' }) => {
  useStylesScoped$(styles);
  return (
    <div
      class={`modal-bg modal-bg_type_${type}`}
      onClick$={() => (store[s] = false)}
    />
  );
});
