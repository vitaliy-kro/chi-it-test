export const extractNumericValue = value => {
  return value.replace(/[^0-9.-]+/g, '');
};
