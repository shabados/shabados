import {
  component$,
  Resource,
  useContext,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import X from '~/components/icons/ui/x';
import { UiContext } from '~/routes/layout-app';
import styles from './inspector.css?inline';

interface InspectorProps {
  id: string;
}

export default component$<InspectorProps>(({ id }) => {
  useStylesScoped$(styles);
  const uiStore = useContext(UiContext);
  const resource = useResource$<string>(async () => {
    console.log(`https://shabados.com/api/l/${id}`);
    // const res = await fetch(`https://shabados.com/api/l/${id}`, {
    const res = await fetch(`https://shabados.com/api/f/sggs`, {
      mode: 'no-cors',
    });
    const data = await res.json();
    console.log(data);
    return data.id as string;
  });

  return (
    <>
      <div class='modal-bg' onClick$={() => (uiStore.inspector = false)} />
      <div class='modal'>
        <article class='modal__header'>
          <h2 class='modal__title'>{id}</h2>
          <span
            dir='rtl'
            class='modal__close'
            onClick$={() => (uiStore.inspector = false)}
          >
            <X />
          </span>
        </article>
        <article class='modal__article'>
          <Resource
            value={resource}
            onPending={() => <p>Hanji...</p>}
            onRejected={(error) => <>Error: {error.message}</>}
            onResolved={(asdf) => <p>{asdf}</p>}
          />
        </article>
      </div>
    </>
  );
});
