import { Types } from "@/types/types";
import { LWWRegister, LWWRegisterState } from "./lww.register";

export class DocumentRegister {
  private readonly _id: string;

  private titleRegister: LWWRegister<string>;
  private contentRegister: LWWRegister<string>;

  get title(): string {
    return this.titleRegister.value;
  }

  get content(): string {
    return this.contentRegister.value;
  }

  get titleState(): LWWRegisterState<string> {
    return this.titleRegister.state;
  }

  get contentState(): LWWRegisterState<string> {
    return this.contentRegister.state;
  }

  constructor(document: Types.DocumentContent) {
    this._id = document.id;

    this.titleRegister = new LWWRegister(`${this._id}-title`, [
      `${this._id}-title`,
      1,
      document.title,
    ]);

    this.contentRegister = new LWWRegister(`${this._id}-content`, [
      `${this._id}-content`,
      1,
      document.content,
    ]);
  }

  updateTitle(title: string): void {
    this.titleRegister.set(title);
  }

  updateContent(content: string): void {
    this.contentRegister.set(content);
  }

  mergeTitle(peerTitle: LWWRegisterState<string>): void {
    this.titleRegister.merge(peerTitle);
  }

  mergeContent(peerContent: LWWRegisterState<string>): void {
    this.contentRegister.merge(peerContent);
  }
}
