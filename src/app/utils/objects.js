export const isObject = (possibleObject) => {
  return typeof possibleObject === 'object' && !Array.isArray(possibleObject) && possibleObject !== null;
};
