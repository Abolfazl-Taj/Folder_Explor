export const getFromLocalStorage = (name: string) => {
  const item = localStorage.getItem(name);
  if (item === undefined) return JSON.parse(item);
  return null;
};

export const setToLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const removeFromLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
