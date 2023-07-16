import { createClient, RedisClientType } from 'redis';
import { TokenCulqi } from "../../../generate-token/domain/token-culqi.entity";
import { CardRepository } from "../../domain/card.repository";
import { Card } from "../../domain/card.entity";

export class CardRedisRepository implements CardRepository {
  client: RedisClientType
  constructor () {
    this.client = createClient({
      password: 'r3d1s_3E2',
      socket: {
        host: 'localhost',
        port: 6379
      }
    })
  }

  async save(token: TokenCulqi, card: Card): Promise<void> {
    const cardObject = card.toObject();

    await this.client.connect();

    await this.client.hSet(token.token, cardObject);
    await this.client.expire(token.token, 15 * 60);

    await this.client.disconnect();
  }

  async get(token: TokenCulqi): Promise<Card> {
    await this.client.connect();

    const cardObject = await this.client.hGetAll(token.token);

    await this.client.disconnect();

    return new Card(
      cardObject.cardNumber,
      cardObject.cvv,
      cardObject.expirationMonth,
      cardObject.expirationYear,
      cardObject.email
    )
  }

}
