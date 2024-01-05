import Decimal from 'decimal.js';

/**
 * @param {any} val1 加数
 * @param {any} val2 加数
 * @returns {number}
 */
export const add = (val1:any, val2:any):number => {
  const value1 = Number(val1);
  const value2 = Number(val2);
  if (!Number.isNaN(value1) && !Number.isNaN(value2)) {
    return Number(new Decimal(value1).add(new Decimal(value2)));
  } else {
    return 0;
  }
}

/**
 * @param {any} val1 被减数
 * @param {any} val2 减数
 * @returns {number}
 */
export const sub = (val1:any, val2:any):number => {
  const value1 = Number(val1);
  const value2 = Number(val2);
  if (!Number.isNaN(value1) && !Number.isNaN(value2)) {
    return Number(new Decimal(value1).sub(new Decimal(value2)));
  } else {
    return 0;
  }
}

/**
 * @param {any} val1 乘数
 * @param {any} val2 乘数
 * @returns {number}
 */
export const mul = (val1:any, val2:any):number => {
  const value1 = Number(val1);
  const value2 = Number(val2);
  if (!Number.isNaN(value1) && !Number.isNaN(value2)) {
    return Number(new Decimal(value1).mul(new Decimal(value2)));
  } else {
    return 0;
  }
}

/**
 * @param {any} val1 被除数
 * @param {any} val2 除数
 * @returns {number}
 */
export const div = (val1:any, val2:any):number => {
  const value1 = Number(val1);
  const value2 = Number(val2);
  if (Number.isNaN(value1) || Number.isNaN(value2) || value2 === 0) {
    return 0;
  } else {
    return Number(new Decimal(value1).div(new Decimal(value2)));
  }
}