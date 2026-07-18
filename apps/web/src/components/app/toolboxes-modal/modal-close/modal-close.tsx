import { component$, useStylesScoped$ } from '@builder.io/qwik';
import X from '~/components/icons/ui/x';
import toggleToolbox, { type ToolboxKey } from '~/lib/toggleToolbox';
import { type Ui } from '~/routes/(app)/layout';
import styles from './modal-close.css?inline';

export default component$(({ store, s }: { store: Ui; s: ToolboxKey }) => {
  useStylesScoped$(styles);
  return (
    <div
      dir='rtl'
      class='modal__close'
      onClick$={() => toggleToolbox(store, s)}
    >
      <X />
    </div>
  );
});
