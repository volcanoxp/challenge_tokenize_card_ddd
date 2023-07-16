import { z } from "zod";

const tokenCulquiSchema = z.object({
  token: z.string().length(16)
});

export type TokenSchema = z.infer<typeof tokenCulquiSchema>;
export class TokenCulqi {
  constructor (public token: string) {
    tokenCulquiSchema.parse({ token });
  }

  private static _generateRandomString(): string {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    const length = 16;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  static generateToken(): TokenCulqi {
    const token = this._generateRandomString();
    return new TokenCulqi(token);
  }
}
