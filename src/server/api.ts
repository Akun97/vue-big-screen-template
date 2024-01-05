import axios from './index';

const apiUrl = process.env.VUE_APP_API_URL;

// const splicingParameters = (param?:any):string => {
//   let paramsString = '';
//   for (const attr in param) {
//       paramsString += `${attr}=${encodeURIComponent(param[attr])}&`
//   }        
//   paramsString = `?${paramsString.substring(0, paramsString.length - 1)}`;
//   return paramsString;
// }

export class api {

  public static system = {
    getInfo: (param?:any):Promise<ResultData> => axios.get('/system/user/getInfo', param, { needToken: true, baseURL: apiUrl }), // 登录验证
    dict: (type:string):Promise<ResultData> => axios.get(`/system/dict/data/type/${type}`, null, { needToken: true, baseURL: apiUrl }), // 字典
  }

}