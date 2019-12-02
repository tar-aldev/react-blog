export const putItemSingle = (name, value) => {
  localStorage.setItem(name, value);
};

export const loadItemLocalStorage = name => {
  try {
    const serializedItem = localStorage.getItem(name);
    if (serializedItem) {
      return JSON.parse(serializedItem);
    }
    return null;
  } catch (error) {
    console.log(`error loading ${name}`);
    return null;
  }
};

export const saveItemLocalStorage = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    console.log("error saving token");
    return null;
  }
};

export const removeItemLocalStorage = name => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.log("error saving token");
    return null;
  }
};
