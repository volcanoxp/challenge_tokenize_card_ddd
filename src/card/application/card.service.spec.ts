import { ZodError } from "zod";
import { CardRedisRepository } from "../infrastructure/repositories/card-redis.repository";
import { CardService } from "./card.service";
import { Card } from "../domain/card.entity";
import { BadRequestResult } from "../../shared/errors";
import { ErrorCode } from "../../shared/error-codes";

jest.mock("../infrastructure/repositories/card-redis.repository");

describe("CardService", () => {
  const cardRepository = new CardRedisRepository();
  const cardService = new CardService(cardRepository);
  let card: Card
  let token: string

  beforeEach(() => {
    const inputCard = {
      cardNumber: "4111111111111111",
      cvv: "1234",
      expirationMonth: "12",
      expirationYear: String(new Date().getFullYear()),
      email: "test@gmail.com"
    };

    // Valid card
    card = new Card(
      inputCard.cardNumber,
      inputCard.cvv,
      inputCard.expirationMonth,
      inputCard.expirationYear,
      inputCard.email
    );

    // Valid token
    token = "okt4qA3sS9VyNPkW";

  })

  it("should return information public card with valid token", async () => {
    jest.spyOn(CardRedisRepository.prototype, 'get')
      .mockImplementation(() => new Promise((resolve, _reject) => resolve(card)));

    const cardPublic = await cardService.getCard(token);

    expect(cardPublic).toEqual(card.getPublicCard());
  })

  it("should return error because token dont exist in DB", async () => {
    jest.spyOn(CardRedisRepository.prototype, 'get')
      .mockImplementation(() => new Promise(
        (_resolve, reject) => reject(
          new BadRequestResult(
            ErrorCode.MissingToken,
            "No information found for the token"
          )
        ))
      );

    try {
      await cardService.getCard(token);
      expect("pass").toBe("error");
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestResult);
      expect(error.code).toBe(ErrorCode.MissingToken);
    }
  })

  it("should return error with invalid data", async () => {
    token = "1243";
    try {
      await cardService.getCard(token);
      expect("pass").toBe("error");
    } catch (error: any) {
      expect(error).toBeInstanceOf(ZodError);
    }
  })

})
