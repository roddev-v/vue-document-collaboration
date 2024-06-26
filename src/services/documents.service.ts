import { Types } from "@/types/types";
import httpService from "@/utils/http.service";

export class DocumentsService {
  private static documentsUrl = `${process.env?.VUE_APP_API_BASE_URL}/document`;

  static async revokeAccess(userId: number, documentId: string): Promise<void> {
    await httpService.post(`${this.documentsUrl}/revoke`, {userId, documentId});
  }

  static async getDocument(id: string): Promise<Types.Document> {
    const res = await httpService.get(`${this.documentsUrl}/${id}`);
    return res.data;
  }

  static async getAll(): Promise<Types.Document[]> {
    const res = await httpService.get(`${this.documentsUrl}/all`);
    return res.data;
  }

  static async getShared(): Promise<Types.Document[]> {
    const res = await httpService.get(`${this.documentsUrl}/shared`);
    return res.data;
  }

  static async createNewDocument(): Promise<Types.Document> {
    const res = await httpService.post(`${this.documentsUrl}/create`, {
      title: "Untitled document",
    });
    return res.data;
  }

  static async deleteDocument(id: string): Promise<void> {
    await httpService.delete(`${this.documentsUrl}/${id}`);
  }

  static async joinDocument(
    documentId: string,
  ): Promise<void> {
    await httpService.post(`${this.documentsUrl}/join/${documentId}`);
  }
}
