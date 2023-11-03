import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export const head: DocumentHead = {
  meta: [
    {
      name: 'description',
      content: 'Learn about shabad',
    },
  ],
};

export default component$(() => (
  <div>
    <h1>404 Not Found</h1>
    <p>
      If you were supposed to be here and end up getting this error, please{' '}
      <a href='mailto:team@shabados.com'>contact us</a>
    </p>
  </div>
));
