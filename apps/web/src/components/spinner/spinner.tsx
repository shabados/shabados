import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './spinner.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class='spinner'>
      <svg
        width='48'
        height='48'
        viewBox='0 0 21 21'
        fill='none'
        stroke='currentColor'
        stroke-width='1'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        {/* using 7 since the math is close to 21 with pi formula */}
        {/* set cx and cy to (viewBox / 2) - stroke-width */}
        <circle cx='9.5' cy='9.5' r='7'></circle>
      </svg>
    </div>
  );
});
