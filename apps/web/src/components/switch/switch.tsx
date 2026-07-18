import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './switch.css?inline';

interface Props {
  disabled?: boolean;
  toggled: boolean;
}

export default component$(({ disabled = false, toggled }: Props) => {
  useStylesScoped$(styles);

  return (
    <input
      class='switch'
      type='checkbox'
      role='switch'
      checked={toggled}
      disabled={disabled}
    />
  );
});
