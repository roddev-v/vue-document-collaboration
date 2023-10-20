import httpService from "@/utils/http.service";

export class DocumentsService {
  private static documentsUrl = `${process.env?.VUE_APP_API_BASE_URL}/document`;

  static async getAll(): Promise<Types.Document[]> {
    const res = await httpService.post(`${this.documentsUrl}/all`);
    return res.data;
  }
}
