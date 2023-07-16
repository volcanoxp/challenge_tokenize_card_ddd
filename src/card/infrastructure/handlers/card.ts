import { ApiHandler } from "../../../shared/api.interface";
import { CardRedisRepository } from "../repositories/card-redis.repository";
import { CardService } from "../../application/card.service";
import { CardController } from "../controllers/card.controller";

const cardRepository: CardRedisRepository = new CardRedisRepository();
const service: CardService = new CardService(cardRepository);
const controller: CardController = new CardController(service);

export const getCard: ApiHandler = controller.getCard;
