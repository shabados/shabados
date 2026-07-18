import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { useContent, useLocation } from '@builder.io/qwik-city';
import styles from './menu.css?inline';

export default component$(() => {
  useStyles$(styles);

  const toggled = useSignal(false);
  const { menu } = useContent();
  const loc = useLocation();

  return (
    <>
      <div
        class={`modal-bg ${toggled.value ? 'open' : 'close'}`}
        onClick$={() => (toggled.value = !toggled.value)}
      />
      <div class='menu-bar'>
        <div class='menu-container'>
          <div
            class={`menu ${toggled.value ? 'open' : 'close'}`}
            tabIndex={0}
            onClick$={() => (toggled.value = !toggled.value)}
          >
            Docs
            <div class='menu-items'>
              {menu
                ? menu.items?.map((item) => (
                    <div class='menu-items-section' key={item.text}>
                      <h5>{item.text}</h5>
                      <div class='menu-items-links'>
                        {item.items?.map((item) => (
                          <a
                            key={item.text}
                            href={item.href}
                            class={{
                              'is-active': loc.url === (item.href as unknown),
                            }}
                            draggable={false}
                          >
                            {item.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div class='menu-close'>
            <span>›</span>
          </div>
        </div>
      </div>
    </>
  );
});
