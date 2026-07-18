import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Menu from '~/components/menu/menu';
import OnThisPage from '~/components/on-this-page/on-this-page';
import styles from './layout.css?inline';
import Header from '~/components/header/header';

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <Header />
      <main>
        <Menu />
        <div class='docs'>
          <OnThisPage />
          <article class='slot'>
            <Slot />
          </article>
        </div>
      </main>
    </>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - Shabad OS Docs`,
  };
};
