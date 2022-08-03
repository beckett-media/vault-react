import { isObject } from './objects';
export const ASC = 'asc';
export const DESC = 'desc';

export const sortByAttribute = (attribute, dir = ASC) => {
  // asc or desc
  return (aObj, bObj) => {
    if (!isObject(aObj) || !isObject(bObj)) return 0;
    return sortValue(aObj[attribute], bObj[attribute], dir);
  };
};

const sortValue = (a, b, dir) => {
  const adjustor = dir === ASC ? 1 : -1;
  if (a < b) return -1 * adjustor;
  if (a > b) return 1 * adjustor;
  return 0;
};
