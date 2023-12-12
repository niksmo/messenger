interface ITokenService {
  setToken(token: string): void;
  getToken(): string;
}

class TokenService implements ITokenService {
  public getToken() {
    return '[token]';
  }

  public setToken(_token: string) {}
}

export default TokenService;
export type { ITokenService };
