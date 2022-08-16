export const isObject = (possibleObject) => {
  return typeof possibleObject === 'object' && !Array.isArray(possibleObject) && possibleObject !== null;
};

export const hasRequiredProperties = (obj, requiredProperties) => {
  if (!isObject(obj) || !Array.isArray(requiredProperties)) {
    return false;
  }
  return !requiredProperties.some((key) => {
    return obj[key] === '' || obj[key] === undefined || obj[key] === null;
  });
};
