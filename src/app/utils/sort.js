import { isObject } from './objects';
const ASC = 'asc';

export const sortByAttribute = (attribute, dir = ASC) => {
  // asc or desc
  return (aObj, bObj) => {
    if (!isObject(aObj) || !isObject(bObj)) return 0;
    const a = aObj[attribute];
    const b = bObj[attribute];
    return sortValue(a, b, dir);
  };
};

const sortValue = (a, b, dir) => {
  if (a == b) return 0;
  return dir === ASC ? a - b : b - a;
};
