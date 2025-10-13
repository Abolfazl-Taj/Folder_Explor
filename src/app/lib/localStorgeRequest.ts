export const getFromLocalStorage = <T = any>(name: string): T | null => {
  const item = localStorage.getItem(name);
  if (!item || item === "undefined") return null; 

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error parsing localStorage item "${name}":`, error);
    return null;
  }
};

export const setToLocalStorage = (name: string, value: unknown): void => {
  try {
    if (value === undefined) {
      console.warn(`Skipped saving "${name}" because value is undefined`);
      return;
    }
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage "${name}":`, error);
  }
};

export const removeFromLocalStorage = (name: string): void => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error(`Error removing localStorage item "${name}":`, error);
  }
};
