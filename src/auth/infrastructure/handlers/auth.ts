import { GuardApiHandler } from "../../../shared/api.interface";
import { AuthService } from "../../application/auth.service";
import { AuthController } from "../controllers/auth.controller";

const service: AuthService = new AuthService();
const controller: AuthController = new AuthController(service);

export const verifyToken: GuardApiHandler = controller.verifyToken;
