import { DocumentsService } from "@/services/documents.service";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import router from "@/router";

export const useDocumentsStore = defineStore("documentsStore", {
  state: (): Store.Documents => ({ documents: [], error: null }),
  getters: {
    docs: (store) => store.documents,
    documentsError: (store) => store.error,
    empty: (store) => store.documents?.length === 0,
  },
  actions: {
    async getAll() {
      try {
        const res = await DocumentsService.getAll();
        this.error = null;
        this.documents = res;
      } catch (e) {
        this.error = (e as AxiosError).message;
      }
    },
    async createNewDocument() {
      try {
        const res = await DocumentsService.createNewDocument();
        router.push(`/app/document/${res.id}`);
      } catch (e) {
        this.error = (e as AxiosError).message;
      }
    },
    async deleteDocument(id: string) {
      try {
        await DocumentsService.deleteDocument(id);
        this.documents = this.documents.filter((d) => d.id !== id);
      } catch (e) {
        this.error = (e as AxiosError).message;
      }
    },
    async inviteUser(documentId: string, query: string) {
      try {
        this.error = null;
        await DocumentsService.inviteToDocument(documentId, query);
      } catch (e) {
        this.error = (e as AxiosError).message;
      }
    },
  },
});
