import { AuthService } from "../../application/auth.service";
import { AuthController } from "./auth.controller";

describe("AuthController", () => {
  const authService = new AuthService();
  const authController = new AuthController(authService);
  const eventInput = {
    headers: {
      Authorization: "Bearer pk_test_1234567a"
    }
  };


  it("Should return allow permission for Bearer token valid", async () => {
    const response = await authController.verifyToken(eventInput);

    expect(response.policyDocument.Statement[0].Effect).toBe("Allow");
  })

  it("Should return allow permission for Bearer token valid", async () => {
    eventInput.headers.Authorization = "Basic pktest1234567as";

    const response = await authController.verifyToken(eventInput);

    expect(response.policyDocument.Statement[0].Effect).toBe("Deny");
  })

})
