import { AuthToken } from "./auth-token.entity";

describe("AuthToken Entity", () => {
  describe("Validate Constructor", () => {
    it("should create AuthToken with token valid", () => {
      const token = "Bearer pk_test_1234567as";
      const authToken = new AuthToken(token);

      expect(authToken.bearerToken).toBe(token);
    })

    it("should return error with invalid Bearer token", () => {
      const token = "Basic pk_test_1234567as";
      expect(() => new AuthToken(token)).toThrow();
    })

    it("should return error with invalid pk token", () => {
      const token = "Basic pktest1234567as";
      expect(() => new AuthToken(token)).toThrow();
    })
  })
})
