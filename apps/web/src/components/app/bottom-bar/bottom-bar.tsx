import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './bottom-bar.css?inline';

interface BottomBarProps {
  prevLink?: string;
  nextLink?: string;
}

export default component$(({ prevLink, nextLink }: BottomBarProps) => {
  useStylesScoped$(styles);
  return (
    <div class='bar'>
      {prevLink && (
        <a class='button' href={prevLink}>
          Prev
        </a>
      )}
      <Slot />
      {nextLink && (
        <a class='button' href={nextLink}>
          Next
        </a>
      )}
    </div>
  );
});
