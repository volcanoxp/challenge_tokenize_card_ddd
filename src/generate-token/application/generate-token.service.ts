import { CardRepository } from "../../card/domain/card.repository";

export class GenerateTokenService {
  constructor (private readonly cardRepository: CardRepository) {}
}
