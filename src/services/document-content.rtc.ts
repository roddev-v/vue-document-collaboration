import { Client, Message } from "stompjs";
import { RTCService } from "./rtc.service";

export class DocumentContentRTC {
  private connectUrl = `http://143.244.204.33/rtc`;
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

  send(event: { type: "update_title" | "update_content"; state: any }) {
    this.client.send(this.changesUrl, {}, JSON.stringify(event));
  }

  subscribe(cb: (state: any) => void) {
    this.client.subscribe(this.updatesUrl, (message: Message) =>
      cb(JSON.parse(message.body))
    );
  }
}

// TODO
/**
 * Figure out why Cloud API Gateway won't load
 */