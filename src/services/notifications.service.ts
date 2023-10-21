
export class NotificationsService {
  private static documentsUrl = `${process.env?.VUE_APP_API_BASE_URL}/notifications`;

  static async subscribe() {
    const uuid = crypto.randomUUID();
    const url = `${this.documentsUrl}/subscribe/${uuid}`;
    const eventSource = new EventSource(url);
  }
}
