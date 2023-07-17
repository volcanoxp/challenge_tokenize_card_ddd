import { createClient, RedisClientType } from 'redis';
import { TokenCulqi } from "../../../generate-token/domain/token-culqi.entity";
import { CardRepository } from "../../domain/card.repository";
import { Card } from "../../domain/card.entity";
import { BadRequestResult } from '../../../shared/errors';
import { ErrorCode } from '../../../shared/error-codes';
export class CardRedisRepository implements CardRepository {
  client: RedisClientType
  constructor () {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string)
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
    if (Object.keys(cardObject).length === 0) {
      throw new BadRequestResult(ErrorCode.MissingToken, "No information found for the token");
    }
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
