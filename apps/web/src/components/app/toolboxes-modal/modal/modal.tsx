import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './modal.css?inline';

export type ModalPositions = 'left' | 'center' | 'right';

interface Props {
  position?: ModalPositions;
  type?: 'default' | 'search';
}

export default component$<Props>(({ position = 'right', type = 'default' }) => {
  useStylesScoped$(styles);

  return (
    <>
      <div class={`modal modal_${position} modal_type_${type}`}>
        <Slot />
      </div>
    </>
  );
});
