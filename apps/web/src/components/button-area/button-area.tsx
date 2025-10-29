import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button-area.css?inline';

interface Props {
  main?: boolean;
}

export default component$(({ main = false }: Props) => {
  useStylesScoped$(styles);

  return (
    <div class={`button-area ${main ? 'button-area__main' : ''}`}>
      <Slot />
    </div>
  );
});
