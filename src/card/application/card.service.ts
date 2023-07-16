import { CardRepository } from "../domain/card.repository";
import { TokenCulqi } from "../../generate-token/domain/token-culqi.entity";
import { CardPublic } from "../domain/card.entity";

export class CardService {
  public constructor (private readonly cardRepository: CardRepository) {}

  public async getCard(token: string): Promise<CardPublic> {
    const tokenCulqi = new TokenCulqi(token);

    const card = await this.cardRepository.get(tokenCulqi);

    return card.getPublicCard();
  }
}
