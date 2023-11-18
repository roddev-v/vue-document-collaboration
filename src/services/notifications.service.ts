import { useAuthStore } from "@/stores/auth.store";
import httpService from "@/utils/http.service";

declare const EventSourcePolyfill: any;

const authStore = useAuthStore();
export class NotificationsService {
  private static notificationsUrl = `${process.env?.VUE_APP_API_BASE_URL}/notifications`;
  private static eventSource: EventSource;

  static subscribe() {
    const url = `${this.notificationsUrl}/subscribe`;
    this.eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    this.eventSource.onopen = () =>
      console.log("Open to receive notifications");

    this.eventSource.onmessage = (msg) => {
      console.log(`Incomming message: ${JSON.stringify(msg)}`);
    };

    this.eventSource.onerror = (e) => {
      console.error(e);
    };
  }

  static unsubscribe() {
    this.eventSource.close();
  }

  static async genUnread(): Promise<any> {
    await httpService.get(`${this.notificationsUrl}/unread`);
  }
}
