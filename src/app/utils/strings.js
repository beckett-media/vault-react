export const trimString = (str, length) => {
  return str.length > length ? `${str.slice(0, length + 1)}...` : str;
};
