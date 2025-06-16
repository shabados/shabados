// Types for history management
export type HistoryItem = {
  title?: string;
  time?: number;
  [key: string]: string | number | undefined;
};

export type PathTimestamp = {
  [path: string]: HistoryItem;
};

/**
 * Get history from localStorage
 * @param storageKey - The localStorage key (default: 'userDataStore')
 * @returns The history object from localStorage
 */
export const getHistory = (storageKey: string = 'userDataStore'): PathTimestamp => {
  if (typeof window === 'undefined') {
    throw new Error('Tried to access localStorage on the server');
  }

  try {
    const data = localStorage.getItem(storageKey);
    if (!data) return {};
    
    const parsed = JSON.parse(data);
    return (parsed.history as PathTimestamp) || {};
  } catch (error) {
    console.warn('Failed to parse history from localStorage:', error);
    return {};
  }
};

/**
 * Add or update a history item in localStorage
 * @param path - The path/route to store in history
 * @param item - The history item data
 * @param storageKey - The localStorage key (default: 'userDataStore')
 */
export const addHistoryItem = (
  path: string,
  item: HistoryItem,
  storageKey: string = 'userDataStore'
): void => {
  if (typeof window === 'undefined') {
    throw new Error('Tried to access localStorage on the server');
  }

  try {
    // Get existing data
    const existingData = localStorage.getItem(storageKey);
    const userData = existingData ? JSON.parse(existingData) : {};
    
    // Ensure history object exists
    if (!userData.history) {
      userData.history = {};
    }

    // Add/update the history item with timestamp
    userData.history[path] = {
      ...item,
      time: item.time || new Date().valueOf(),
    };

    // Save back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to save history item to localStorage:', error);
  }
};
