declare namespace Dtos {
  type LoginDto = {
    email: string;
    password: string;
  };

  type RegisterDto = {
    email: string;
    password: string;
    nickname: string;
  };

  type AuthResponseDto = {
    token: string;
    user: User;
  };
}
