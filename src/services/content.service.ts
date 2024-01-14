import { Types } from "@/types/types";
import httpService from "@/utils/http.service";

export class ContentService {
  private static contentUrl = `${process.env?.VUE_APP_API_BASE_URL}/content`;

  static async get(documentId: string): Promise<Types.DocumentContent> {
    const res = await httpService.get(`${this.contentUrl}/${documentId}`);
    return res.data;
  }

  static async create(
    document: Types.Document
  ): Promise<Types.DocumentContent> {
    const res = await httpService.post(`${this.contentUrl}`,  {
      id: document.id,
      title: document.title,
      content: ""
    });
    return res.data;
  }
}
