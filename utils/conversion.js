import { Bech32 } from '@cosmjs/encoding';

export function convertMicroDenomToDenom(amount) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount / 1000000
  return isNaN(amount) ? 0 : amount
}

export function convertDenomToMicroDenom(amount) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount * 1000000
  return isNaN(amount) ? '0' : String(amount).split('.')[0];
}

export function convertFromMicroDenom(denom) {
  return denom?.substring(1).toUpperCase()
}

export const numberWithCommas = (x, digits = 3) => {
  if (isEmpty(x)) return '0';
  return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}

export const parseNumber = (n, digits = 3) => {
  if (isNaN(n)) return 0;
  return parseInt((n * 10 ** digits).toString()) / 10 ** digits;
}

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const getAssetTypeExtension = (value) => {
  if (!value) {
    return null;
  }

  const array = value.split('/');

  if (array && array.length && array[1]) {
    return array[1];
  }

  return null;
};

export const getShortAddress = (address, short = false) => {
  if (isEmpty(address)) return '';
  return address.slice(0, short ? 5: 10) + '...' + address.slice(address.length - 5, address.length);
}

const COUNT_ABBRS = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];

export const formatCount = (count, withAbbr = false, decimals = 4) => {
  const i = (count === 0) ? count : Math.floor(Math.log(count) / Math.log(1000));
  let result = parseFloat((count / Math.pow(1000, i)).toFixed(decimals));
  if (withAbbr) {
    result += `${COUNT_ABBRS[i]}`;
  }

  return result;
};

export const decodeFromBech32 = (key) => {
  try {
      Bech32.decode(key);
      return true;
  } catch (e) {
      return false;
  }
};