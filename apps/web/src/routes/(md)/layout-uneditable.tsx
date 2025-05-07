import { component$, Slot } from '@builder.io/qwik';

import type { DocumentHead } from '@builder.io/qwik-city';
import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <div>
          <article>
            <Slot />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - Shabad OS`,
  };
};
