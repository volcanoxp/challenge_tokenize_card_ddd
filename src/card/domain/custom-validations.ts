import luhn from "luhn";

export const onlyDigits = (value: string): boolean => {
  const regex = /^\d+$/;
  return regex.test(value);
}
export const messageOnlyDigits = "Only digits allowed";


export const allowMonthDigits = (value: string): boolean => {
  const month = parseInt(value)
  if ( month > 0 && month <= 12) return true;
  return false;
}
export const messageAllowMonthDigits = "Only the digits from 1 to 12 are allowed";


export const validateAlgorithLuhn = (value: string): boolean => {
  return luhn.validate(value);
}
export const messageValidateAlgorithLuhn = "The card numbers do not comply with the luhn algorithm";


export const allowActualToNextFiveYear = (value: string): boolean => {
  const actualYear = new Date().getFullYear();
  const nextFiveYear = actualYear + 5;
  const year = parseInt(value);

  if (year >= actualYear && year <= nextFiveYear) return true;
  return false;
}
export const messageAllowActualToNextFiveYear = "Valid years are from year is the current year to the next 5 years";
