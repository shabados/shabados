import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header-jump.css?inline';
import JumpButton from '../jump-button/jump-button';

interface Props {
  source: string;
  max: number;
  title: string;
}

export default component$(({ source, max, title }: Props) => {
  useStylesScoped$(styles);
  return (
    <div class='header-jump'>
      <JumpButton source={source} max={max} title={title} />
    </div>
  );
});
