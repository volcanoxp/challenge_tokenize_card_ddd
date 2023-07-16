import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { ZodError } from "zod";
import { CardService } from "../../application/card.service";
import { TokenSchema } from "../../../generate-token/domain/token-culqi.entity";
import { CardPublic } from "../../domain/card.entity";
import { ResponseBuilder } from "../../../shared/response-builder";
import { ErrorCode } from "../../../shared/error-codes";
import { BadRequestResult } from "../../../shared/errors";

export class CardController {
  public constructor(private readonly cardService: CardService) {}

  public getCard = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    try {
      const { token } = event.pathParameters as TokenSchema;

      const card = await this.cardService.getCard(token);

      return ResponseBuilder.ok<CardPublic>(card);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return ResponseBuilder.badRequest(ErrorCode.InvalidInputData, "The information sent doesn't comply with the proper format");
      } else if (error instanceof BadRequestResult) {
        return ResponseBuilder.badRequest(error.code, error.description);
      }
      return ResponseBuilder.internalServerError(error);
    }
  }

}
