import { useAuthStore } from "@/stores/auth.store";
import { useToast } from "primevue/usetoast";
import { Notification } from "@/models/notification.model";
import httpService from "@/utils/http.service";
import { useDocumentsStore } from "@/stores/documents.store";
import { ActionsToDahsboardNavigate, ActionsToRefresh } from "@/utils/consts";
import { useRouter } from "vue-router";

declare const EventSourcePolyfill: any;

const authStore = useAuthStore();
export class NotificationsService {
  private static notificationsUrl = `${process.env?.VUE_APP_API_BASE_URL}/notifications`;
  private static eventSource: EventSource;

  static subscribe() {
    const url = `${this.notificationsUrl}/subscribe`;

    const router = useRouter();
    const toast = useToast();
    const documentsStore = useDocumentsStore();

    this.eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    this.eventSource.onopen = () =>
      console.log("Open to receive notifications");

    this.eventSource.onmessage = (msg) => {
      const notification = new Notification(JSON.parse(msg.data));
      toast.add(notification.view);

      if (ActionsToDahsboardNavigate.includes(notification.type!)) {
        router.replace("/app");
      }
      if (ActionsToRefresh.includes(notification.type!)) {
        documentsStore.refreshData();
      }
    };

    this.eventSource.onerror = (e) => console.error(e);
  }

  static unsubscribe() {
    this.eventSource.close();
  }

  static async genUnread(): Promise<any> {
    await httpService.get(`${this.notificationsUrl}/unread`);
  }
}
