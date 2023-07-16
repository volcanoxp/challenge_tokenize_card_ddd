// import { ZodError } from "zod";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  const authService = new AuthService();

  it("should return void with valid token", () => {
    const token = "Bearer pk_test_1234567as";
    const result = authService.verifyAuthToken(token);
    expect(result).toBeUndefined();
  })

  it("should return error with invalid token", () => {
    const token = "Basic pktest1234567as";
    expect(() => authService.verifyAuthToken(token)).toThrow();
  })
})
