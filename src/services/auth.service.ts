import httpService from "@/utils/http.service";

export class AuthService {
  private static authUrl = `${process.env?.VUE_APP_API_BASE_URL}/auth`;

  static async logIn(dto: Dtos.LoginDto): Promise<Dtos.AuthResponseDto> {
    const res = await httpService.post(`${this.authUrl}/login`, dto);
    return res.data;
  }

  static async register(dto: Dtos.RegisterDto): Promise<Dtos.AuthResponseDto> {
    const res = await httpService.post(`${this.authUrl}/register`, dto);
    return res.data;
  }
}
