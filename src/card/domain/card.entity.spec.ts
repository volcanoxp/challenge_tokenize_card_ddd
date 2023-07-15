import { ZodError } from "zod";
import { Card, CardSchema } from "./card.entity";

describe("Card Entity", () => {
  describe("Validate Constructor", () => {
    let inputCard: CardSchema

    beforeEach(() => {
      // Valid values
      inputCard = {
        cardNumber: '4111111111111111',
        cvv: '1234',
        expirationMonth: '12',
        expirationYear: String(new Date().getFullYear()),
        email: 'test@gmail.com'
      };
    })

    it("should create Card with valid data", () => {
      const card = new Card(
        inputCard.cardNumber,
        inputCard.cvv,
        inputCard.expirationMonth,
        inputCard.expirationYear,
        inputCard.email
      );
      expect(card).toBeInstanceOf(Card);
    })

    it("should return error with cardNumber of invalid length characters", () => {
      inputCard.cardNumber = "411111111";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().cardNumber).toBeDefined();
      }
    })

    it("should return error with cardNumber of invalid characters", () => {
      inputCard.cardNumber = "4111111xx11";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().cardNumber).toBeDefined();
      }
    })

    it("should return error with cardNumber no verify luhn algorithm", () => {
      inputCard.cardNumber = "41111144111111";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().cardNumber).toBeDefined();
      }
    })

    it("should return error with cvv of invalid length characters", () => {
      inputCard.cvv = "12345";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().cvv).toBeDefined();
      }
    })

    it("should return error with cvv of invalid characters", () => {
      inputCard.cvv = "123E";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().cvv).toBeDefined();
      }
    })

    it("should return error with expirationMonth of invalid length characters", () => {
      inputCard.expirationMonth = "0001";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().expirationMonth).toBeDefined();
      }
    })

    it("should return error with expirationMonth of invalid characters", () => {
      inputCard.expirationMonth = "AA";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().expirationMonth).toBeDefined();
      }
    })

    it("should return error with expirationMonth of invalid month", () => {
      inputCard.expirationMonth = "13";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().expirationMonth).toBeDefined();
      }
    })

    it("should return error with expirationYear of invalid year with 3 digits", () => {
      inputCard.expirationYear = "999";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().expirationYear).toBeDefined();
      }
    })

    it("should return error with expirationYear of invalid characters", () => {
      inputCard.expirationYear = "ABCD";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().expirationYear).toBeDefined();
      }
    })

    it("should create Card with valid expirationYear from next 5 year", () => {
      inputCard.expirationYear = String(new Date().getFullYear() + 5);
      const card = new Card(
        inputCard.cardNumber,
        inputCard.cvv,
        inputCard.expirationMonth,
        inputCard.expirationYear,
        inputCard.email
      );
      expect(card).toBeInstanceOf(Card);
    })

    it("should return an error with expirationYear from last year", () => {
      inputCard.expirationYear = String(new Date().getFullYear() - 1);
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().expirationYear).toBeDefined();
      }
    })

    it("should return an error with expirationYear from next 6 year", () => {
      inputCard.expirationYear = String(new Date().getFullYear() + 6);
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().expirationYear).toBeDefined();
      }
    })

    it("should return error with invalid email", () => {
      inputCard.email = "aaaagmail.com";
      try {
        expect(() => new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        )).toThrow();

        new Card(
          inputCard.cardNumber,
          inputCard.cvv,
          inputCard.expirationMonth,
          inputCard.expirationYear,
          inputCard.email
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error.format().email).toBeDefined();
      }
    })

  })
})
