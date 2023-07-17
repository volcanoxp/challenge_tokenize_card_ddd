import { APIGatewayEvent, Context } from "aws-lambda";
import { CardRedisRepository } from "../../../card/infrastructure/repositories/card-redis.repository";
import { GenerateTokenService } from "../../application/generate-token.service";
import { GenerateTokenController } from "./generate-token.controller";
import { CardSchema } from "../../../card/domain/card.entity";
import { HttpStatusCode } from "../../../shared/http-status-codes";
import { ResponseGenerateToken } from "../../application/generate-token.interfaces";
import { ErrorResponseBody } from "../../../shared/api.interface";
import { ErrorCode } from "../../../shared/error-codes";

jest.mock("../../../card/infrastructure/repositories/card-redis.repository");

describe("GenerateTokenController", () => {
  const cardRepository = new CardRedisRepository();
  const generateTokenService = new GenerateTokenService(cardRepository);
  const generateTokenController = new GenerateTokenController(generateTokenService);
  const event: APIGatewayEvent = <APIGatewayEvent>{};
  const context: Context = <Context>{};
  let inputCard: CardSchema;

  beforeEach(() => {
    inputCard = {
      cardNumber: "4111111111111111",
      cvv: "1234",
      expirationMonth: "12",
      expirationYear: String(new Date().getFullYear()),
      email: "test@gmail.com"
    };

    event.body = JSON.stringify(inputCard);
  })

  it("should return statusCode 200 with valid data", async () => {
    const response = await generateTokenController.generateToken(event, context);
    const body: ResponseGenerateToken = JSON.parse(response.body);

    expect(response.statusCode).toBe(HttpStatusCode.Ok);
    expect(body.token).toBeDefined();
  })

  it("should return statusCode 400 with invalid data", async () => {
    inputCard.cardNumber = "4111112544x55";
    event.body = JSON.stringify(inputCard);

    const response = await generateTokenController.generateToken(event, context);
    const body: ErrorResponseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(HttpStatusCode.BadRequest);
    expect(body.error.code).toBe(ErrorCode.InvalidInputData);
  })
})
