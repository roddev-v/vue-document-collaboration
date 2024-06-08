import { defineStore } from "pinia";
import { ContentService } from "@/services/content.service";
import { Store } from "@/types/store";
import { DocumentRegister } from "@/models/document-register.model";
import { DocumentsService } from "@/services/documents.service";
import { LWWRegisterState } from "@/models/lww.register";
import { DocumentContentRTC } from "@/services/document-content.rtc";
import { useAuthStore } from "./auth.store";

const authStore = useAuthStore();

export const useDocumentSessionStore = defineStore("documentSessionStore", {
  state: (): Store.DocumentSession => ({
    id: "",
    authorId: -1,
    sharedUsers: [],
    register: null,
    rtcSession: null,
  }),
  getters: {
    documentId: (store) => store.id,
    title: (store) => store.register?.title,
    content: (store) => store.register?.content,
    users: (store) => store.sharedUsers,
    isSharedWithUsers: (store) => store.sharedUsers?.length > 0,
    titleState: (store) => store.register?.titleState,
    contentState: (store) => store.register?.contentState,
    canRevokeAccess: (store) => authStore.user.id === store.authorId
  },
  actions: {
    async load(id: string): Promise<void> {
      const documentContent = await ContentService.get(id);
      const metadata = await DocumentsService.getDocument(id);

      this.sharedUsers = metadata.sharedUsers;
      this.register = new DocumentRegister(documentContent);
      this.id = id;
      this.authorId = metadata.authorId;
    },
    revokeUser(id: number): void {
      this.sharedUsers = this.sharedUsers.filter((u) => u.id === id);
      console.log(this.sharedUsers);
    },
    updateTitle(value: string): void {
      this.register?.updateTitle(value);
      if (!this.rtcSession) {
        return;
      }
      this.rtcSession.send({
        type: "update_title",
        state: this.titleState,
        userId: authStore.user.id,
        documentId: this.id,
      });
    },
    updateContent(value: string): void {
      this.register?.updateContent(value);
      if (!this.rtcSession) {
        return;
      }
      this.rtcSession.send({
        type: "update_content",
        state: this.contentState,
        userId: authStore.user.id,
        documentId: this.id,
      });
    },
    mergeTitle(state: LWWRegisterState<string>): void {
      this.register?.mergeTitle(state);
    },
    mergeContent(state: LWWRegisterState<string>): void {
      this.register?.mergeContent(state);
    },
    mergeRTCEvent(event: any) {
      if (event.type === "update_title") {
        this.mergeTitle(event.state);
      } else {
        this.mergeContent(event.state);
      }
    },
    initRTCSession(): void {
      this.rtcSession = new DocumentContentRTC(this.id);
      this.rtcSession.connect(() => {
        this.rtcSession?.subscribe((event) => this.mergeRTCEvent(event));
      });
    },
    disconnectRTCSession(): void {
      this.rtcSession?.disconnect();
      this.rtcSession = null;
    },
  },
});
