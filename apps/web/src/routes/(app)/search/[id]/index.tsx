import { type RequestHandler, routeLoader$, Link } from '@builder.io/qwik-city';
import { component$ } from '@builder.io/qwik';
import { addHistoryItem } from '~/lib/localStorage';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7 * 2,
    maxAge: 60 * 60 * 24 * 2,
  });
  cacheControl(
    {
      staleWhileRevalidate: 60 * 60 * 24 * 7 * 2,
      maxAge: 60 * 60 * 24 * 2,
    },
    'CDN-Cache-Control',
  );
};

export const useApi = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    `https://shabados.com/api/search/${requestEvent.params.id}`,
  );
  try {
    const data = await res.json();
    return data;
  } catch {
    return '';
  }
});

export default component$(() => {
  const signal = useApi();

  // until api is updated to new sant lipi markup, need to make local fixes
  const replaces: any = {
    '꠳ਯ': '︀ਯ',
    '꠴ਯ': '︂ਯ',
    '꠵ਯ': '︁︂ਯ',
    'ਁ': 'ਂ︀',
  };

  return signal.value ? (
    <div class='ui'>
      <article>
        {signal.value.exact &&
          signal.value.exact.map(
            ({ container, blocks, id, source, title }: any) => {
              const newTitle = Object.keys(replaces).reduce(
                (updatedSrc, key) => updatedSrc.replaceAll(key, replaces[key]),
                title,
              );
              return (
                <Link
                  key={1}
                  href={`/g/${container.id}`}
                  style='text-decoration: none !important; display: block;'
                  onClick$={() => addHistoryItem(`/g/${container.id}`, { title: newTitle })}
                >
                  <p style='color: var(--fg);'>{source.name} </p>
                  <p class='small'>
                    {source.id}
                    {' > '}
                    {container.id}
                    {' > '}
                    {id}
                  </p>
                  <h2>{newTitle}</h2>
                  <p style='color: var(--fg);'>
                    {blocks.map(({ str, match }: any) =>
                      match ? (
                        <b key={1}>{str} </b>
                      ) : (
                        <span key={1}>{str} </span>
                      ),
                    )}
                  </p>
                </Link>
              );
            },
          )}
        {signal.value.overflow &&
          signal.value.overflow.map(
            ({ container, blocks, id, source, title }: any) => {
              const newTitle = Object.keys(replaces).reduce(
                (updatedSrc, key) => updatedSrc.replaceAll(key, replaces[key]),
                title,
              );
              return (
                <Link
                  key={1}
                  href={`/g/${container.id}`}
                  style='text-decoration: none !important; display: block;'
                  onClick$={() => addHistoryItem(`/g/${container.id}`, { title: newTitle })}
                >
                  <p style='color: var(--fg);'>{source.name} </p>
                  <p class='small'>
                    {source.id}
                    {' > '}
                    {container.id}
                    {' > '}
                    {id}
                  </p>
                  <h2>{newTitle}</h2>
                  <p style='color: var(--fg);'>
                    {blocks.map(({ str, match }: any) =>
                      match ? (
                        <b key={1}>{str} </b>
                      ) : (
                        <span key={1}>{str} </span>
                      ),
                    )}
                  </p>
                </Link>
              );
            },
          )}
      </article>
    </div>
  ) : (
    <div class='ui'>
      <article>
        <h1>Sorry</h1>
        <p>No results found</p>
      </article>
    </div>
  );
});
