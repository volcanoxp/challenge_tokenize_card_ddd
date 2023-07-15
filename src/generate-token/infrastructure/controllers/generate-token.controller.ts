import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { GenerateTokenService } from "../../application/generate-token.service";
import { ResponseBuilder } from "../../../shared/response-builder";

export class GenerateTokenController {
  constructor (private readonly generateTokenService: GenerateTokenService) {}

  async generateToken(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    return ResponseBuilder.ok<any>({ hello: 'world'});
  }
}
