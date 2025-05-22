import { component$, Slot } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import EditThisPage from '~/components/edit-this-page/edit-this-page';

export default component$(() => {
  return (
    <>
      <Slot />
      <p>
        <EditThisPage magicPath='/(md)' />
      </p>
    </>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - Shabad OS Support`,
  };
};
