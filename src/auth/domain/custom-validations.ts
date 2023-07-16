
export const hasBearer = (value: string): boolean => {
  return value.split(" ")[0] === "Bearer";
}
export const messageHasBearer = "Invalid token";

export const hasStructureTokenPK = (value: string): boolean => {
  const tokenPK = value.split(" ")[1].split("_");

  if (tokenPK[0] !== "pk") return false;
  if (tokenPK.length !== 3) return false;

  return true;
}
export const messageHasStructureTokenPK = "Invalid format token pk";
