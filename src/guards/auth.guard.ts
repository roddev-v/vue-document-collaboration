import { useAuthStore } from "@/stores/auth.store";

export function authGuard() {
  const store = useAuthStore();
  if (store.isAuth) {
    return true;
  }
  return { name: "auth" };
}
