interface ITokenService {
  setToken: (token: string) => void;
  getToken: () => string;
}

class TokenService implements ITokenService {
  public getToken(): string {
    return '[token]';
  }

  public setToken(_token: string): void {}
}

export default TokenService;
export type { ITokenService };
