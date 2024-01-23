import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/styles/index.scss';
import VueFullscreen from 'vue-fullscreen';

const app = createApp(App);

app.directive('debounce', {
  beforeMount(el, binding) {
    const debounceTime = parseInt(binding.arg) || 300;
    el.addEventListener('dblclick', () => {
      if (!el.disabled) {
        el.disabled = true;
        binding.value();
        setTimeout(() => {
          el.disabled = false;
        }, debounceTime);
      }
    });
  }
});

app.use(VueFullscreen);
app.use(createPinia());
app.use(router);
app.mount('#app');