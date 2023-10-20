import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth.store";
import { StorageKeys } from "./utils/consts";

const pinia = createPinia();
const app = createApp(App).use(router).use(pinia);
const auth = useAuthStore();

const token = localStorage.getItem(StorageKeys.TOKEN);
if (token) {
  auth.setToken(token);
}
app.mount("#app");
