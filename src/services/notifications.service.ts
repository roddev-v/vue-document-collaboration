export class NotificationsService {
  private static documentsUrl = `${process.env?.VUE_APP_API_BASE_URL}/notifications`;
  private static eventSource: EventSource;

  static subscribe() {
    const url = `${this.documentsUrl}/subscribe`;
    this.eventSource = new EventSource(url);
    this.eventSource.onopen = () =>
      console.log("Open to receive notifications");
    this.eventSource.onmessage = (msg) => {
      console.log(`Incomming message: ${msg}`);
    };
  }

  static unsubscribe() {
    this.eventSource.close();
  }
}
