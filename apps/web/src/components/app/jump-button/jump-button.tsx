import { component$, useStylesScoped$ } from '@builder.io/qwik';
import handleJump from '~/lib/handleJump';
import styles from './jump-button.css?inline';

interface Props {
  source: string;
  max: number;
  title?: string;
}

export default component$(({ source, max, title = 'Jump' }: Props) => {
  useStylesScoped$(styles);
  return <button onClick$={() => handleJump(source, max)}>{title}</button>;
});
