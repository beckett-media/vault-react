export const trimString = (str, length) => {
  return str.length > length ? `${str.slice(0, length + 1)}...` : str;
};

export const formatPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const swapObjectKeyValue = (obj) => {
  const ret = {};
  Object.keys(obj).forEach((key) => {
    ret[obj[key]] = key;
  });
  return ret;
};
