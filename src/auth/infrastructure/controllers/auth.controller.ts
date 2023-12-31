import { AuthService } from "../../application/auth.service";
import { EffectPolicy, GuardResponse } from "../../../shared/api.interface";

export class AuthController {
  public constructor (private readonly authService: AuthService) {}

  public verifyToken = async (event: any): Promise<GuardResponse> => {
    try {
      const { Authorization: authToken } = event.headers

      this.authService.verifyAuthToken(authToken as string);

      return this._generatePolicy('anonymous', "Allow", event.methodArn);

    } catch (error) {
      return this._generatePolicy('anonymous', "Deny", event.methodArn);
    }
  }

  private _generatePolicy(principalId: string, effect: EffectPolicy,  methodArn: string): GuardResponse {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn,
          },
        ],
      },
  };
  }
}
