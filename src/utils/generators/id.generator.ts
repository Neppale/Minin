import { createHmac } from "node:crypto";

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = BigInt(ALPHABET.length);
const ID_SECRET_KEY = process.env.ID_SECRET_KEY || "mininin";

export function generateId(originalUrl: string): string {
  const currentTimestamp = Date.now();
  const hash = createHmac("sha256", ID_SECRET_KEY)
    .update(`${originalUrl}:${currentTimestamp}`)
    .digest("hex");

  const substring = hash.substring(0, 10);

  let decimalValue = BigInt(`0x${substring}`);

  let result = "";
  while (decimalValue > 0) {
    const remainder = decimalValue % BASE;
    result = ALPHABET[Number(remainder)] + result;
    decimalValue = decimalValue / BASE;
  }

  return result.padStart(7, "0").substring(0, 7);
}
