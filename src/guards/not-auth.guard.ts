import { useAuthStore } from "@/stores/auth.store";

export function notAuthGuard() {
  const store = useAuthStore();
  if (store.isAuth) {
    return { name: "home" };
  }
  return true;
}
