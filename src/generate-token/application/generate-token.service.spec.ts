import { ZodError } from "zod";
import { CardRedisRepository } from "../../card/infrastructure/repositories/card-redis.repository";
import { GenerateTokenService } from "./generate-token.service";
import { CardSchema } from "../../card/domain/card.entity";

jest.mock("../../card/infrastructure/repositories/card-redis.repository");


describe("GenerateTokenService", () => {
  const cardRepository = new CardRedisRepository()
  const generateTokenSevice = new GenerateTokenService(cardRepository);
  let inputCard: CardSchema;

  beforeEach(() => {
    // Valid values
    inputCard = {
      cardNumber: "4111111111111111",
      cvv: "1234",
      expirationMonth: "12",
      expirationYear: String(new Date().getFullYear()),
      email: "test@gmail.com"
    };
  })

  it("should return token with valid data", async () => {
    const token = await generateTokenSevice.generateTokenCulqi(inputCard);

    expect(token.token).toBeDefined();
  })

  it("should call save cardRepository", async () => {
    await generateTokenSevice.generateTokenCulqi(inputCard);

    expect(CardRedisRepository).toHaveBeenCalledTimes(1);
  })

  it("should return error with invalid data", async () => {
    inputCard.cardNumber = "xxxxxxxxxxxx";
    try {
      await generateTokenSevice.generateTokenCulqi(inputCard);
      expect("pass").toBe("error");
    } catch (error: any) {
      expect(error).toBeInstanceOf(ZodError);
    }
  })

})


