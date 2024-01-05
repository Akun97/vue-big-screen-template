const useGlobal = () => {

  const hasFile = (name:string):boolean => {
    try {
      require(`@/common/echart/map/${name}.json`);
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    hasFile,
  }

}

export default useGlobal;