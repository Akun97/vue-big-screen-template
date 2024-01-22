import { div, mul, sub, add } from './decimal';

/** 
 * @description 数字千分位格式化
 * @param {number} num 数字
 * @returns {string}
 */
export const formatNumber = (num:number):string => {
  if (num) {
    const decimal = num.toString().split('.')[1];
    return num
      .toString()
      .split('.')[0]
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      }) + `${decimal ? `.${decimal}` : ''}`;
  } else {
    return '0';
  }
}

/**
 * @description 获取坐标轴最大值、最小值、分割间隔
 * @param {number} min 最小值
 * @param {number} man 最大值
 * @param {number} count 分割线数量
 * @returns { max: number, min: number, interval: number }
 */
export const getInterval = (data:number[], count: number):{
  max: number,
  min: number,
  interval: number
} => {
  const maxValue = Math.ceil(Math.max.apply(null, data));
  const maxPow = maxValue.toString().length - 1;
  const max = mul(Math.ceil(div(maxValue, Math.pow(10, maxPow === 0 ? 1 : maxPow))), Math.pow(10, maxPow === 0 ? 1 : maxPow));
  const minValue = Math.floor(Math.min.apply(null, data));
  const min = minValue < 0 ? minValue : 0;
  // 控制分割条数，
  const distance = div(sub(max, min), count);
  return {
    max,
    min,
    interval: Math.ceil(distance),
  };
}

/**
 * @description axislabel换行
 * @param {string} value 原始字符串
 * @param {number} provideNumber 每行能显示的字的个数
 * @param {number} rowNumber 行数
 * @returns {string}
 */
export const axislabelNewline = (value:string, provideNumber:number, rowNumber:number):string => {
  let newValue = '';
  const valueNumber = value.length;
  if (valueNumber > provideNumber) {
    for (let i = 0; i < rowNumber; i++) {
      let tempStr = '';
      const start = i * provideNumber;
      const end = start + provideNumber;
      if (i === (rowNumber - 1)) {
        tempStr = value.substring(start);
      } else {
        tempStr = value.substring(start, end) + '\n';
      }
      newValue += tempStr;
    }
  } else {
    newValue = value;
  }
  return newValue;
}

/**
 * @description 计算百分比
 * @param {number} number 目标数字
 * @param {number[]} numbers 
 * @returns {number} 百分比
 * */ 
export const calculatePercentage = (number:number, numbers:number[]):number => {
  const sum = numbers.reduce((a, b) => add(a,b), 0);
  // 计算百分比
  const percentage = mul(div(number, sum), 100);
  return percentage;
}

/**
 * @description 计算总和
 * @param {number[]} numbers 
 * @returns {number} 总和
 * */ 
 export const calculateSum = (numbers:number[]):number => {
  const sum = numbers.reduce((a, b) => add(a,b), 0);
  return sum;
}

/**
 * @description 回显数据字典
 * @param {any[]} datas 字典列表
 * @param {string} value 键值
 * @returns {number} 字典回显
 * */ 
export const selectDictLabel = (datas:any[], value:string):string => {
  const actions:string[] = [];
  Object.keys(datas).some((key:any) => {
    if (datas[key].dictValue == "" + value) {
      actions.push(datas[key].dictLabel);
      return true;
    }
  });
  return actions.length === 0 ? '' : actions.join("");
}

/**
 * @description 回显数据字典（字符串数组）
 * @param {any[]} datas 字典列表
 * @param {string} value 键值
 * @param {string} separator 分隔符
 * @returns {number} 字典回显
 * */ 
export const selectDictLabels = (datas:any[], value:string, separator?:string):string => {
  const actions:string[] = [];
  const currentSeparator = undefined === separator ? "," : separator;
  const temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val:any) => {
    Object.keys(datas).some((key:any) => {
      if (datas[key].dictValue == "" + temp[val]) {
        actions.push(datas[key].dictLabel + currentSeparator);
        return true;
      }
    });
  });
  return actions.length === 0 ? '' : actions.join("");
}