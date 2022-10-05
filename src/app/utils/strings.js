export const trimString = (str, length) => {
  return str.length > length ? `${str.slice(0, length + 1)}...` : str;
};

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatPrice = priceFormatter.format;

export const swapObjectKeyValue = (obj) => {
  const ret = {};
  Object.keys(obj).forEach((key) => {
    ret[obj[key]] = key;
  });
  return ret;
};

export const toUpperCase = (str) => {
  if (typeof str === 'string' || str instanceof String) {
    return str.toUpperCase();
  }
  return str;
};

export const removeTrailingDashes = (str) => {
  if (!(typeof str === 'string' || str instanceof String)) return str;
  if (str.length <= 0 || str.charAt(str.length - 1) !== '-') return str;
  return removeTrailingDashes(str.slice(0, -1));
};
