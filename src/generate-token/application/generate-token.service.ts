import { CardRepository } from "../../card/domain/card.repository";
import { Card, CardSchema } from "../../card/domain/card.entity";
import { TokenCulqi } from "../domain/token-culqi.entity";
import { ResponseGenerateToken } from "./generate-token.interfaces";

export class GenerateTokenService {
  public constructor (private readonly cardRepository: CardRepository) {}

  public async generateTokenCulqi(cardSchema: CardSchema): Promise<ResponseGenerateToken> {

    const card: Card = new Card(
      cardSchema.cardNumber,
      cardSchema.cvv,
      cardSchema.expirationMonth,
      cardSchema.expirationYear,
      cardSchema.email
    );

    const tokenCulqi: TokenCulqi = TokenCulqi.generateToken();

    await this.cardRepository.save(tokenCulqi, card);

    return {
      token: tokenCulqi.token
    };

  }
}
