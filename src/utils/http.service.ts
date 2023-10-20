import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth.store";
import router from "@/router";
import { StorageKeys } from "./consts";

const httpService = axios.create();

httpService.interceptors.request.use((config) => {
  console.log("Imcomming request...");
  const token = localStorage.getItem(StorageKeys.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpService.interceptors.response.use(
  (config) => config,
  (err: AxiosError) => {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      useAuthStore().logOut();
      router.replace("/auth");
    }
  }
);

export default httpService;
