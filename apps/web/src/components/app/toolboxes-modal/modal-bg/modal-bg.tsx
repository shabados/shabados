import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { type ToolboxKey } from '~/lib/toggleToolbox';
import styles from './modal-bg.css?inline';
import { type Ui } from '~/routes/(app)/layout';

type Props = {
  store: Ui;
  s: ToolboxKey;
};

export default component$<Props>(({ store, s }) => {
  useStylesScoped$(styles);
  return <div class={`modal-bg`} onClick$={() => (store[s] = false)} />;
});
