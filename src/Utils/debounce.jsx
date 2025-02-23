export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId); // Cancel previous pending execution
    timeoutId = setTimeout(() => func(...args), delay); // Schedule new execution
  };
};
