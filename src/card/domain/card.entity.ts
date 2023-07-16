import { z } from "zod";
import {
  onlyDigits,
  messageOnlyDigits,
  allowMonthDigits,
  messageAllowMonthDigits,
  validateAlgorithLuhn,
  messageValidateAlgorithLuhn,
  allowActualToNextFiveYear,
  messageAllowActualToNextFiveYear
} from "./custom-validations";

const cardSchema = z.object({
  cardNumber: z.string()
    .min(13)
    .max(16)
    .refine(onlyDigits, messageOnlyDigits)
    .refine(validateAlgorithLuhn, messageValidateAlgorithLuhn),
  cvv: z.string()
    .min(3)
    .max(4)
    .refine(onlyDigits, messageOnlyDigits),
  expirationMonth: z.string()
    .min(1)
    .max(2)
    .refine(onlyDigits, messageOnlyDigits)
    .refine(allowMonthDigits, messageAllowMonthDigits),
  expirationYear: z.string()
    .length(4)
    .refine(onlyDigits, messageOnlyDigits)
    .refine(allowActualToNextFiveYear, messageAllowActualToNextFiveYear),
  email: z.string()
    .min(5)
    .max(100)
    .email(),
})

export type CardSchema = z.infer<typeof cardSchema>;
export type CardPublic = Omit<CardSchema, "cvv">;

export class Card {
  constructor (
    public cardNumber: string,
    public cvv: string,
    public expirationMonth: string,
    public expirationYear: string,
    public email: string
  ) {
    cardSchema.parse({
      cardNumber,
      cvv,
      expirationMonth,
      expirationYear,
      email
    })
  }

  toObject(): CardSchema {
    return {
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      expirationMonth: this.expirationMonth,
      expirationYear: this.expirationYear,
      email: this.email
    }
  }

  static validateSchema(cardData: CardSchema): void {
    cardSchema.parse(cardData);
  }

  getPublicCard(): CardPublic {
    return {
      cardNumber: this.cardNumber,
      expirationMonth: this.expirationMonth,
      expirationYear: this.expirationYear,
      email: this.email
    }
  }
}
