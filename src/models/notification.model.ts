import { ActionSeverity } from "@/utils/consts";
import { ToastMessageOptions } from "primevue/toast";

export class Notification {
  id?: number;
  createdAt?: string;
  delivered?: boolean;
  recipientId?: number;
  snederEmail?: string;
  senderNickname?: string;
  type?: "USER_JOINED" | "DOCUMENT_DELETED";

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  private getContent() {
    switch (this.type) {
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
      default:
        return "Info";
    }
  }

  get view(): ToastMessageOptions {
    return {
      severity: ActionSeverity[this.type!],
      summary: this.getSummary(),
      detail: this.getContent(),
      life: 5000,
    };
  }
}