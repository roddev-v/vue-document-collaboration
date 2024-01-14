import { Client } from "stompjs";
import { RTCService } from "./rtc.service";

export class DocumentContentRTC {
  private connectUrl = `http://143.244.204.33/rtc`;
  private client: Client;

  constructor() {
    this.client = new RTCService(this.connectUrl).client;
  }

  connect(
    onConnected = () => console.log("Connected to RTC service!"),
    onError = () => console.error('Error connecting to the RTC service')
  ) {
    this.client.connect({}, onConnected, onError);
  }
}

// TODO
/**
 * Figure out why Cloud API Gateway won't load
*/