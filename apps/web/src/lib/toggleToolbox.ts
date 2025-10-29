import { $ } from '@builder.io/qwik';
import { Ui } from '~/routes/(app)/layout';

// Only allow toggling a specific subset of Ui keys
export type ToolboxKey = Extract<
  keyof Ui,
  'controls' | 'collections' | 'journey' | 'search'
>;

const toggleToolbox = $((store: Ui, key: ToolboxKey | null) => {
  (['controls', 'collections', 'journey', 'search'] as ToolboxKey[]).forEach(
    (item) => {
      if (item !== key) {
        store[item] = false;
      }
    },
  );
  if (key) {
    store[key] = !store[key];
  }
});

export default toggleToolbox;
