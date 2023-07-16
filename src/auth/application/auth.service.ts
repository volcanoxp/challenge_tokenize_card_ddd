import { AuthToken } from "../domain/auth-token.entity";

export class AuthService {
  public verifyAuthToken (token: string): void {

    AuthToken.validateSchema(token);

  }
}
