import { DocumentRegister } from "@/models/document-register.model";
import { DocumentContentRTC } from "@/services/document-content.rtc";

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
  type Notifications = {
    notifications: Types.Notification[];
    readNotifications: Types.Notificationp[];
  };
  type DocumentSession = {
    id: string;
    authorId: number;
    sharedUsers: Types.User[];
    register: DocumentRegister | null;
    rtcSession: DocumentContentRTC | null;
    sessionLogs: { type: string; userId: number }[];
  };
}
