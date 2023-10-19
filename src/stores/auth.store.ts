import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({ token: "" }),
  getters: {
    hasToken: (state) => !!state.token,
  },
  actions: {
    logIn() {
      this.token = "Token";
    },
    logOut() {
      this.token = "";
    },
  },
});
