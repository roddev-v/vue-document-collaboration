import { over, Client } from "stompjs";
import SockJS from "sockjs-client";

export class RTCService {
  private _client: Client;

  get client(): Client {
    return this._client;
  }

  constructor(url: string) {
    const ws = new SockJS(url);
    this._client = over(ws);
  }
}
