export const n6 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 6,
});
export const n4 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

export const c2 = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  return `${str.substr(0, n)}...${str.substr(str.length - n, str.length)}`;
};

export const tokenValue = (value, decimals = 18) =>
  value / Math.pow(10, decimals);

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
export const tokenValueTxt = (value, decimals, symbol) =>
  `${n4.format(tokenValue(value, decimals))} ${symbol}`;

export const getDate = (tim) => {
  if (!tim) return "";
  const date = (new Date(tim * 1000) + "").slice(0, 16);
  const time = (new Date(tim * 1000) + "").slice(16, 24);
  const combined = new Date(tim * 1000).toLocaleString();

  return { date, time, combined };
};
