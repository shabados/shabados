import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './track-controls.css?inline';

// Should show "chapters" of current item as well as previous/next items in the queue
export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class={`navi`}>
      <div class='track'>
        <div class='active' />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      {/* <div class='controls'>
        <a href='#' preventdefault:click draggable={false}>
          <SkipBack />
        </a>
        <a href='#' preventdefault:click draggable={false}>
          <GoHome />
        </a>
        <a href='#' preventdefault:click draggable={false}>
          <SkipForward />
        </a>
      </div> */}
    </div>
  );
});
