import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth.store";
import { StorageKeys } from "./utils/consts";

import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import ConfirmationService from "primevue/confirmationservice";

import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "eventsource/lib/eventsource-polyfill.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

const pinia = createPinia();
const app = createApp(App)
  .use(ConfirmationService)
  .use(PrimeVue)
  .use(router)
  .use(pinia);

const auth = useAuthStore();
const token = localStorage.getItem(StorageKeys.TOKEN);
if (token) {
  auth.setToken(token);
  auth.checkToken(token);
}
app.mount("#app");
