/**
 * @description 时间格式化
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 * @returns {String}
 */
export const formatTime = (
  time: string | number | Date,
  fmt: string
): string => {
  if (!time) return '-';
  const date = new Date(time);
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        // @ts-ignore: Unreachable code error
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

/**
 * @description 获取指定天数的时间范围
 * @param {number} count 需要获取的天数,0:今天 1:昨天 -1::明天 -2:后天 7:最近7天 30:最近30天
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 * @returns {String[]}
 */
export const getDays = (count:number, fmt:string):string[] => {
  // 拼接时间
  const time1 = new Date();
  const time2 = new Date();
  if (count === 1) {
    time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000));
  } else {
    if (count >= 0) {
      time1.setTime(time1.getTime());
    } else {
      if (count === -2) {
        time1.setTime(time1.getTime() + (24 * 60 * 60 * 1000) * 2);
      } else {
        time1.setTime(time1.getTime() + (24 * 60 * 60 * 1000));
      }
    }
  }
  const timer1 = formatTime(time1, fmt); // 当前时间
  time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count));
  const timer2 = formatTime(time2, fmt); // 之前的7天或者30天
  return [timer2, timer1]
}

/**
 * @description 获取当前月份
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 * @returns {String[]}
 */
export const getCurrentMonth = (fmt:string):string[] => {
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const nextMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const lastDay = new Date(nextMonthFirstDay.getTime() - 1);
  return [formatTime(firstDay, fmt), formatTime(lastDay, fmt)];
}