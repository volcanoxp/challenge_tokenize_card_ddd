import { z } from "zod";
import {
  hasBearer,
  messageHasBearer,
  hasStructureTokenPK,
  messageHasStructureTokenPK
} from "./custom-validations";

const authTokenSchema = z.object({
  bearerToken: z.string()
    .refine(hasBearer, messageHasBearer)
    .refine(hasStructureTokenPK, messageHasStructureTokenPK)
});

export class AuthToken {
  constructor (public bearerToken: string) {
    authTokenSchema.parse({ bearerToken });
  }

  static validateSchema(bearerToken: string) {
    authTokenSchema.parse({ bearerToken });
  }
}
