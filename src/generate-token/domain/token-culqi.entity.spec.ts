import { TokenCulqi } from "./token-culqi.entity";

describe("TokenCulqi Entity", () => {
  describe("Validate Constructor", () => {
    it("should create TokenCulqi with token valid", () => {
      const token = "abcd123adcDwe21W";
      const tokenCulqi = new TokenCulqi(token);

      expect(tokenCulqi.token).toBe(token);
    })

    it("should not create TokenCulqi with token invalid", () => {
      const token = "123";
      expect(() => new TokenCulqi(token)).toThrow();
    })
  })

  describe("Validate generateToken function", () => {
    it("should create TokenCulqi", () => {
      const tokenCulqi = TokenCulqi.generateToken();
      expect(tokenCulqi).toBeInstanceOf(TokenCulqi);
    })

    it("should create token with 16 characters", () => {
      const tokenCulqi = TokenCulqi.generateToken();
      expect(tokenCulqi.token.length).toBe(16);
    })
  })
})
