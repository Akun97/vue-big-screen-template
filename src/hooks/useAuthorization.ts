import jsCookie from 'js-cookie';

const useAuthorization = () => {

  const useroute = useRoute();
  const userouter = useRouter();
  const showView = ref<boolean>(false);

  const getInfo = () => {
    if (useroute.query.token) {
      jsCookie.set("Zgw-Token", useroute.query.token);
    }
    api.system.getInfo().then(res => {
      if (res.code === 'C00000') {
        if (useroute.query.token) {
          userouter.replace(useroute.path);
        }
        showView.value = true;
      }
    });
  }

  return {
    showView,
    getInfo
  }

}

export default useAuthorization;