import { DocumentsService } from "@/services/documents.service";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ContentService } from "@/services/content.service";
import router from "@/router";

export const useDocumentsStore = defineStore("documentsStore", {
  state: (): Store.Documents => ({ documents: [], sharedDocuments: [], error: null }),
  getters: {
    docs: (store) => store.documents,
    shared: (store) => store.sharedDocuments,
    documentsError: (store) => store.error,
    empty: (store) => store.documents?.length === 0,
    emptyShared: (store) => store.sharedDocuments?.length === 0,
  },
  actions: {
    async refreshData() {
      await Promise.all([this.getAll(), this.getShared()]);
    },
    async getAll() {
      try {
        const res = await DocumentsService.getAll();
        this.error = null;
        this.documents = res;
      } catch (e) {
        this.error = (e as AxiosError).message;
      }
    },
    async getShared() {
      try {
        const res = await DocumentsService.getShared();
        this.error = null;
        this.sharedDocuments = res;
      } catch (e) {
        this.error = (e as AxiosError).message;
      }
    },
    async createNewDocument() {
      try {
        const res = await DocumentsService.createNewDocument();
        await ContentService.create(res);
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
    async joinDocument(documentId: string) {
      try {
        this.error = null;
        await DocumentsService.joinDocument(documentId);
        await this.getShared();
      } catch (e) {
        this.error = (e as AxiosError).message;
      }
    },
  },
});
