import { AuthService } from "@/services/auth.service";
import { StorageKeys } from "@/utils/consts";
import { AxiosError } from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: (): Store.AuthStore => ({ token: null, user: null, error: null }),
  getters: {
    isAuth: (state) => !!state.token,
    authError: (state) => state.error,
  },
  actions: {
    async logIn(dto: Dtos.LoginDto) {
      try {
        this.error = null;
        const res = await AuthService.logIn(dto);
        this.token = res.token;
        this.user = res.user;
        localStorage.setItem(StorageKeys.TOKEN, res.token);
      } catch (e) {
        const axiosError = e as AxiosError;
        if (axiosError.response?.status === 400) {
          this.error = "Please check your credentials!";
        }
      }
    },
    async register(dto: Dtos.RegisterDto) {
      try {
        this.error = null;
        const res = await AuthService.register(dto);
        this.token = res.token;
        this.user = res.user;
        localStorage.setItem(StorageKeys.TOKEN, res.token);
      } catch (e) {
        const axiosError = e as AxiosError;
        if (axiosError.response?.status === 400) {
          this.error = "Please check your credentials!";
        }
      }
    },
    setToken(token: string) {
      this.token = token;
    },
    logOut() {
      localStorage.removeItem(StorageKeys.TOKEN);

      this.token = null;
      this.user = null;
      this.error = null;
    },
  },
});
