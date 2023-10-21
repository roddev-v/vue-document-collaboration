import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth.store";
import { StorageKeys } from "./utils/consts";

import App from "./App.vue";
import router from "./router";

import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const pinia = createPinia();
const app = createApp(App).use(router).use(pinia);

const auth = useAuthStore();
const token = localStorage.getItem(StorageKeys.TOKEN);
if (token) {
  auth.setToken(token);
  auth.checkToken(token);
}
app.mount("#app");
