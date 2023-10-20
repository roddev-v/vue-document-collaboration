declare namespace Store {
  type AuthStore = {
    token: string | null;
    user: Types.User | null;
    error: string | null;
  };
}
