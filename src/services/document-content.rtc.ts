import { Client, Message } from "stompjs";
import { RTCService } from "./rtc.service";

export class DocumentContentRTC {
  private connectUrl = `${process.env?.VUE_APP_API_BASE_URL}/rtc`;
  private client: Client;
  private readonly changesUrl: string;
  private readonly updatesUrl: string;

  constructor(documentId: string) {
    this.client = new RTCService(this.connectUrl).client;
    this.changesUrl = `/app/events/${documentId}`;
    this.updatesUrl = `/events/updates/${documentId}`;
  }

  connect(
    onConnected = () => console.log("Connected to RTC service!"),
    onError = () => console.error("Error connecting to the RTC service")
  ) {
    this.client.connect({}, onConnected, onError);
  }

  send(event: { type: "update_title" | "update_content"; state: any; userId: string, documentId: string }) {
    this.client.send(this.changesUrl, {}, JSON.stringify(event));
  }

  subscribe(cb: (state: any) => void) {
    this.client.subscribe(this.updatesUrl, (message: Message) =>
      cb(JSON.parse(message.body))
    );
  }

  disconnect(cb = () => console.log('Disconnected from RTC')): void {
    this.client.disconnect(cb);
  }
}

// TODO
/**
 * Figure out why Cloud API Gateway won't load
 */
