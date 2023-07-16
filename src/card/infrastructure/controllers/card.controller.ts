import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { CardService } from "../../application/card.service";
import { TokenSchema } from "../../../generate-token/domain/token-culqi.entity";
import { CardPublic } from "../../domain/card.entity";
import { ResponseBuilder } from "../../../shared/response-builder";

export class CardController {
  public constructor(private readonly cardService: CardService) {}

  public getCard = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {

    const { token } = event.pathParameters as TokenSchema;

    const card = await this.cardService.getCard(token);

    return ResponseBuilder.ok<CardPublic>(card);
  }
}
