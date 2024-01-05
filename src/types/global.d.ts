/**
 * @description 请求结果
 * */ 
interface Result {
  code: string | number;
  rows: any;
  msg: string;
}


/**
 * @description 请求结果带data
 * */ 
interface ResultData<T = any> extends Result {
  data?: T;
}