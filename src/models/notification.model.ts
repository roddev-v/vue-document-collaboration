import { ActionSeverity, ActionsToDahsboardNavigate, ActionsToRefresh } from "@/utils/consts";
import { ToastMessageOptions } from "primevue/toast";

export class Notification {
  id?: number;
  createdAt?: string;
  delivered?: boolean;
  recipientId?: number;
  snederEmail?: string;
  senderNickname?: string;
  type!: "USER_JOINED" | "DOCUMENT_DELETED" | "DOCUMENT_ACCESS_REVOKED";

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  private getContent() {
    switch (this.type) {
      case "DOCUMENT_ACCESS_REVOKED":
        return `@${this.senderNickname} revoked your acces to a document!`;
      case "USER_JOINED":
        return `@${this.senderNickname} joined your document via the document ID!`;
      case "DOCUMENT_DELETED":
        return `@${this.senderNickname} deleted a document shared with you. If you need access, contact the document author.`;
      default:
        return "You have a new notification!";
    }
  }

  private getSummary() {
    switch (this.type) {
      case "USER_JOINED":
        return `User joined!`;
      case "DOCUMENT_DELETED":
        return `Document deleted!`;
      case "DOCUMENT_ACCESS_REVOKED":
        return "Access revoked :(";
      default:
        return "Info";
    }
  }

  get shoudNavigateToDashboard(): boolean {
    return ActionsToDahsboardNavigate.includes(this.type);
  }

  get shouldRefreshDashboard(): boolean {
    return ActionsToRefresh.includes(this.type);
  }

  get view(): ToastMessageOptions {
    return {
      severity: ActionSeverity[this.type],
      summary: this.getSummary(),
      detail: this.getContent(),
      life: 5000,
    };
  }
}
