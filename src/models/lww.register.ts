export type LWWRegisterState<T> = [peer: string, timestamp: number, value: T];

export class LWWRegister<T> {
  private readonly id: string;
  public state: LWWRegisterState<T>;

  constructor(id: string, state: [string, number, T]) {
    this.id = id;
    this.state = state;
  }

  get value() {
    return this.state[2];
  }

  set(value: T) {
    this.state = [this.id, this.state[1] + 1, value];
  }

  merge(state: [peer: string, timestamp: number, value: T]) {
    const [localPeer, localTimestamp] = this.state;
    const [remotePeer, remoteTimestamp] = state;

    if (localTimestamp > remoteTimestamp) {
      return;
    }

    if (localTimestamp === remoteTimestamp && localPeer > remotePeer) {
      return;
    }

    this.state = state;
  }
}
