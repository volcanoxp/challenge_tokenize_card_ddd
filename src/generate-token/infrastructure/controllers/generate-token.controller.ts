import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { ZodError } from "zod";
import { GenerateTokenService } from "../../application/generate-token.service";
import { ResponseBuilder } from "../../../shared/response-builder";
import { CardSchema } from "../../../card/domain/card.entity";
import { ResponseGenerateToken } from "../../application/generate-token.interfaces";
import { ErrorCode } from "../../../shared/error-codes";

export class GenerateTokenController {
  public constructor (private readonly generateTokenService: GenerateTokenService) {}

  public generateToken = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    try {
      const cardData: CardSchema = JSON.parse(event.body as string);

      const response = await this.generateTokenService.generateTokenCulqi(cardData);

      return ResponseBuilder.ok<ResponseGenerateToken>(response);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return ResponseBuilder.badRequest(ErrorCode.InvalidInputData, "The information sent doesn't comply with the proper format");
      }
      return ResponseBuilder.internalServerError(error);
    }
  }
}
