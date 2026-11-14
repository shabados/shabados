import type { ToolboxKey } from '~/lib/toggleToolbox';
import type { Ui } from '~/routes/(app)/layout';

// Esc dismisses these. Search is left out: it has its own input and focus handling.
const escapable: ToolboxKey[] = ['controls', 'collections', 'journey'];

// Toolboxes are mutually exclusive, so at most one is open; null when none is.
const openToolbox = (store: Pick<Ui, ToolboxKey>): ToolboxKey | null =>
  escapable.find((key) => store[key]) ?? null;

export default openToolbox;
