import { APIGatewayEvent, Context } from "aws-lambda";
import { CardRedisRepository } from "../repositories/card-redis.repository";
import { CardService } from "../../application/card.service";
import { CardController } from "./card.controller";
import { Card } from "../../domain/card.entity";
import { HttpStatusCode } from "../../../shared/http-status-codes";
import { ErrorResponseBody } from "../../../shared/api.interface";
import { ErrorCode } from "../../../shared/error-codes";
import { BadRequestResult } from "../../../shared/errors";

jest.mock("../repositories/card-redis.repository");

describe("CardController", () => {
  const cardRepository = new CardRedisRepository();
  const cardService = new CardService(cardRepository);
  const cardController = new CardController(cardService);
  let card: Card
  const event: APIGatewayEvent = <APIGatewayEvent>{};
  const context: Context = <Context>{};

  beforeEach(() => {
    const inputCard = {
      cardNumber: "4111111111111111",
      cvv: "1234",
      expirationMonth: "12",
      expirationYear: String(new Date().getFullYear()),
      email: "test@gmail.com"
    };

    // Set valid data
    event.pathParameters = {
      token: "abcd123adcDwe21W"
    }

    // Valid card
    card = new Card(
      inputCard.cardNumber,
      inputCard.cvv,
      inputCard.expirationMonth,
      inputCard.expirationYear,
      inputCard.email
    );

    jest.spyOn(CardRedisRepository.prototype, 'get')
      .mockImplementation(() => new Promise((resolve, _reject) => resolve(card)));
  })

  it("should return statusCode 200 with valid token", async () => {
    const response = await cardController.getCard(event, context);

    expect(response.statusCode).toBe(HttpStatusCode.Ok);
    expect(JSON.parse(response.body)).toEqual(card.getPublicCard());
  })

  it("should return statusCode 400 with invalid format token", async () => {
    event.pathParameters = {
      token: "1235"
    }
    const response = await cardController.getCard(event, context);

    const body: ErrorResponseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(HttpStatusCode.BadRequest);
    expect(body.error.code).toBe(ErrorCode.InvalidInputData);
  })

  it("should return statusCode 400 with token don't exists in DB", async () => {
    jest.spyOn(CardRedisRepository.prototype, 'get')
      .mockImplementation(() => new Promise(
        (_resolve, reject) => reject(
          new BadRequestResult(
            ErrorCode.MissingToken,
            "No information found for the token"
          )
        ))
      );

    const response = await cardController.getCard(event, context);

    const body: ErrorResponseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(HttpStatusCode.BadRequest);
    expect(body.error.code).toBe(ErrorCode.MissingToken);
  })
})
