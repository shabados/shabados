import { component$, useStylesScoped$ } from '@builder.io/qwik';
import Lotus from '../icons/lotus';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class={`header__container`}>
      <header>
        <div>
          <a href='/' class='logo' draggable={false}>
            <div class='lotus'>
              <Lotus />
            </div>
            <span>Shabad OS</span>
          </a>
        </div>
      </header>
    </div>
  );
});
