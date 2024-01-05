import axios from 'axios';
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import jsCookie from 'js-cookie';
import qs from 'qs';

const config = {
  // 设置超时时间
  timeout: 120000,
  // 跨域时候允许携带凭证
  withCredentials: true
}

interface AxiosRequestConfigExtend extends AxiosRequestConfig {
  needToken?: boolean
  formData?: boolean
  baseURL?: string
}

const configExtend:AxiosRequestConfigExtend = {
  needToken: false,
  formData: false,
}

const toLogin = ():void => {
  ElMessage({ 
    message: '暂未登录或登录过期，请重新登录', 
    type: 'error', 
    duration: 1500,
    appendTo: document.getElementById('index'),
    onClose: () => {
      window.location.href = store().env.URL_MAIN;
    }
  });
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfigExtend) {
    // 实例化axios
    this.service = axios.create(config);
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfigExtend) => {
        const controller = new AbortController();
        const headers = {
          "Accept": "*/*"
        }
        if (config.formData) {
          headers['content-type'] = 'application/x-www-form-urlencoded';
          config.data = qs.stringify(config.data);
        }
        if (config.needToken) {
          const token = jsCookie.get("Zgw-Token");
          if (token) {
            headers['Authorization'] = token;
          } else {
            toLogin();
            controller.abort();
          }
        }
        return {
          ...config,
          headers: headers
        } as InternalAxiosRequestConfig
      },  
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    );
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        switch (data.code) {
          case null:
          case undefined:
          case 200:
          case 'C00000':
            return data;
          case 401:
          case 'W000022':
          case 'W00020':
            if (jsCookie.get("Zgw-Token")) {
              jsCookie.remove("Zgw-Token");
            }
            toLogin();
            return Promise.reject(data);
          default:
            ElMessage({ message: data.msg??'请求出错', type: 'error', appendTo: document.getElementById('index') });
            return Promise.reject(data);
        }
      },
      (error: AxiosError<any>) => {
        const { response } = error;
        if (response) {
          this.handleCode(response.status, response.data?.msg??'');
        }
        if (!window.navigator.onLine) {
          ElMessage({ message: '网络出错', type: 'error', appendTo: document.getElementById('index') });
        }
        return Promise.reject(error);
      }
    );
  }

  handleCode(code: number, msg: string):void {
    switch(code) {
      case 403:
        if (jsCookie.get("Zgw-Token")) {
          jsCookie.remove("Zgw-Token");
        }
        toLogin();
        break;
      default:
        ElMessage({ message: msg || '请求失败', type: 'error', appendTo: document.getElementById('index') });
        break;
    }
  }

  // 常用方法封装
  get<T = any>(url: string, params?:any, config:AxiosRequestConfigExtend = configExtend):Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config });
  }

  post<T = any>(url: string, data?: any, config:AxiosRequestConfigExtend = configExtend):Promise<ResultData<T>> {
    return this.service.post(url, data, { ...config });
  }

  put<T = any>(url: string, data?: any, config:AxiosRequestConfigExtend = configExtend):Promise<ResultData<T>> {
    return this.service.put(url, data, { ...config });
  }

  delete<T = any>(url: string, params?: any, config:AxiosRequestConfigExtend = configExtend):Promise<ResultData<T>> {
    return this.service.delete(url, { params, ...config });
  }

}

export default new RequestHttp(config)