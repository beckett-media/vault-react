const debounce = (func, waitFor) => {
  let timeout;

  return (...args) =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export default debounce;
