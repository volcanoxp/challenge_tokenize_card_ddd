import { Card } from "./card.entity";
import { TokenCulqi } from "../../generate-token/domain/token-culqi.entity";

export interface CardRepository {
  save(token: TokenCulqi, card: Card): Promise<void>;
  get(token: TokenCulqi): Promise<Card>;
}
