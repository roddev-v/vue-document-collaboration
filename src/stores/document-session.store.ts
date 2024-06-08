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
    sessionLogs: [],
    userCarets: {},
  }),
  getters: {
    documentId: (store) => store.id,
    title: (store) => store.register?.title,
    content: (store) => store.register?.content,
    users: (store) => store.sharedUsers,
    isSharedWithUsers: (store) => store.sharedUsers?.length > 0,
    titleState: (store) => store.register?.titleState,
    contentState: (store) => store.register?.contentState,
    canRevokeAccess: (store) => authStore.user.id === store.authorId,
    logs: (store) => store.sessionLogs,
    carets: (store) => store.userCarets,
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
    updateCarrentPosition(target: "title" | "content", position: number): void {
      this.rtcSession?.send({
        type: "update_caret_position",
        state: [target, Date.now(), position.toString()],
        userId: authStore.user.id,
        documentId: this.id,
      });
    },
    mergeRTCEvent(event: any) {
      this.sessionLogs.push(event);
      if (event.type === "update_title") {
        this.mergeTitle(event.state);
      } else if (event.type === "update_content") {
        this.mergeContent(event.state);
      } else {
        const [caretTarget, , position] = event.state;
        const target: "title" | "content" = caretTarget;
        if (event.userId === this.authorId) {
          return;
        }

        this.userCarets = {
          ...this.userCarets,
          [event.userId]: {
            target,
            color: "red",
            position: +position,
          },
        };
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
      this.sessionLogs = [];
    },
  },
});
