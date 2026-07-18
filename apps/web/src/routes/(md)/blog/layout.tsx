import type { DocumentHead } from '@builder.io/qwik-city';

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - Shabad OS Blog`,
  };
};
