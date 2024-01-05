import { defineStore } from 'pinia';

// 获取body标签上的环境变量
const getAttribute = (key:string):any => {
  const value = document.querySelector('body')?.getAttribute(key);
  document.querySelector('body')?.removeAttribute(key);
  return value;
}

const useEnvStore = defineStore('env', {
  state: () => {
    return {
      showApp: false,
      URL_MAIN: '',
    }
  },
  actions: {
    getEnv() {
      this.URL_MAIN = getAttribute('URL_MAIN')??this.URL_MAIN;
      this.showApp = true;
    }
  }
});

export default useEnvStore;