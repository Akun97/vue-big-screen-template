import useEnvStore from "./modules/useEnvStore";

export default function useStore() {
  return {
    env: useEnvStore()
  }
}