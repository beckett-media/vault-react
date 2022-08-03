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
  if (a == b) return 0;
  return dir === ASC ? a - b : b - a;
};
