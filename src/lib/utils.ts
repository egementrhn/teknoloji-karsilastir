import type { PriceInfo } from "@/app/data/mockPhones";

export function getLowestPrice(prices: PriceInfo[]): PriceInfo | null {
  if (!prices || prices.length === 0) return null;
  return prices.reduce((min, p) => (p.price < min.price ? p : min), prices[0]);
}
