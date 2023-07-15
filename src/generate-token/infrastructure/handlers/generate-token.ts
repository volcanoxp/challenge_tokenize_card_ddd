import { ApiHandler } from "../../../shared/api.interface";
import { CardRedisRepository } from "../../../card/infrastructure/repositories/card-redis.repository";
import { GenerateTokenService } from "../../application/generate-token.service";
import { GenerateTokenController } from "../controllers/generate-token.controller";

const cardRepository: CardRedisRepository = new CardRedisRepository();
const service: GenerateTokenService = new GenerateTokenService(cardRepository);
const controller: GenerateTokenController = new GenerateTokenController(service);

export const generateToken: ApiHandler = controller.generateToken;
