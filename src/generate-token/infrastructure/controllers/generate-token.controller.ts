import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { GenerateTokenService } from "../../application/generate-token.service";
import { ResponseBuilder } from "../../../shared/response-builder";
import { CardSchema } from "../../../card/domain/card.entity";
import { ResponseGenerateToken } from "../../application/generate-token.interfaces";

export class GenerateTokenController {
  public constructor (private readonly generateTokenService: GenerateTokenService) {}

  public generateToken = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const cardData: CardSchema = JSON.parse(event.body as string);

    const response = await this.generateTokenService.generateTokenCulqi(cardData);

    return ResponseBuilder.ok<ResponseGenerateToken>(response);
  }
}
