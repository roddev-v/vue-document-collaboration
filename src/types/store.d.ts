declare namespace Store {
  type Auth = {
    token: string | null;
    user: Types.User | null;
    error: string | null;
  };
  type Documents = {
    documents: Types.Document[];
    sharedDocuments: Types.Document[];
    error: string | null;
  };
}
