// Types for history management
export type HistoryItem = {
  title?: string;
  time?: number;
  [key: string]: string | number | undefined;
};

export type PathTimestamp = {
  [path: string]: HistoryItem;
};

export type SearchHistory = {
  query: string;
};

/**
 * Generic function to set an object in localStorage
 * @param key - The localStorage key
 * @param obj - The object to store
 */
export const setLocalStorage = (key: string, obj: object): void => {
  if (typeof window === 'undefined') {
    throw new Error('Tried to access localStorage on the server');
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Generic function to get an object from localStorage
 * @param key - The localStorage key
 * @returns The parsed object from localStorage, or an empty object if not found
 */
export const getLocalStorage = (key: string): any => {
  if (typeof window === 'undefined') {
    throw new Error('Tried to access localStorage on the server');
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  } catch (error) {
    console.warn('Failed to parse data from localStorage:', error);
    return {};
  }
};

/**
 * Get user data from localStorage
 * @param key which user data (leave blank for all)
 */
export const getUserData = (key?: 'history' | 'searches') => {
  const data = getLocalStorage('userDataStore');
  if (!key) return data;
  return key in data ? data[key] : {};
};

/**
 * Add or update a history item in localStorage
 * @param path - The path/route to store in history
 * @param item - The history item data
 */
export const addHistoryItem = (path: string, item: HistoryItem): void => {
  const userData = getUserData();

  // Ensure history object exists
  if (!('history' in userData)) {
    userData.history = {};
  }

  // Add/update the history item with timestamp
  userData.history[path] = {
    ...item,
    time: item.time || new Date().valueOf(),
  };

  // Save back to localStorage
  setLocalStorage('userDataStore', userData);
};

/**
 * Add or update search history in localStorage
 * @param query - The path/route to store in history
 */
export const addSearchQuery = (query: string): void => {
  const userData = getUserData();

  // Ensure searches array exists
  if (!('searches' in userData)) {
    userData.searches = [];
  }

  // Find the index of the element
  const index = userData.searches.indexOf(query);

  // If the element exists, remove it
  if (index > -1) {
    userData.searches.splice(index, 1);
  }

  // Add the element to the front of the array
  userData.searches.unshift(query);

  // Save back to localStorage
  setLocalStorage('userDataStore', userData);
};
