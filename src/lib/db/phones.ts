import { eq } from "drizzle-orm";
import { db } from "./client";
import { phones, phonePrices, phoneStoreUrls } from "./schema";
import type {
  Phone as AppPhone,
  PhoneSpecification,
  PriceInfo,
} from "../../app/data/mockPhones";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildAppPhone(
  phoneRow: typeof phones.$inferSelect,
  priceRows: (typeof phonePrices.$inferSelect)[],
  storeUrlRow: typeof phoneStoreUrls.$inferSelect | null,
): AppPhone {
  return {
    id: phoneRow.id,
    brand: phoneRow.brand,
    model: phoneRow.model,
    imageUrl: phoneRow.imageUrl,
    releaseDate: phoneRow.releaseDate,
    specifications: JSON.parse(phoneRow.specifications) as PhoneSpecification,
    prices: priceRows
      .filter((p): p is typeof p & { price: number } => p.price !== null)
      .map(
        (p): PriceInfo => ({
          store: p.store,
          price: p.price,
          currency: p.currency,
          url: p.url,
          updatedAt: p.updatedAt,
        }),
      ),
    storeUrls: {
      amazon: storeUrlRow?.amazon ?? undefined,
      trendyol: storeUrlRow?.trendyol ?? undefined,
      hepsiburada: storeUrlRow?.hepsiburada ?? undefined,
    },
  };
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/** Tüm telefonları döndürür (listing sayfaları için). */
export async function getAllPhones(): Promise<AppPhone[]> {
  const [allPhones, allPrices, allStoreUrls] = await Promise.all([
    db.select().from(phones),
    db.select().from(phonePrices),
    db.select().from(phoneStoreUrls),
  ]);

  const pricesByPhoneId = new Map<
    string,
    (typeof phonePrices.$inferSelect)[]
  >();
  for (const price of allPrices) {
    const list = pricesByPhoneId.get(price.phoneId) ?? [];
    list.push(price);
    pricesByPhoneId.set(price.phoneId, list);
  }

  const storeUrlsByPhoneId = new Map<
    string,
    typeof phoneStoreUrls.$inferSelect
  >();
  for (const su of allStoreUrls) {
    storeUrlsByPhoneId.set(su.phoneId, su);
  }

  return allPhones.map((phone) =>
    buildAppPhone(
      phone,
      pricesByPhoneId.get(phone.id) ?? [],
      storeUrlsByPhoneId.get(phone.id) ?? null,
    ),
  );
}

/** Tek bir telefonu ID ile döndürür. */
export async function getPhoneById(id: string): Promise<AppPhone | null> {
  const [phoneRows, priceRows, storeUrlRows] = await Promise.all([
    db.select().from(phones).where(eq(phones.id, id)),
    db.select().from(phonePrices).where(eq(phonePrices.phoneId, id)),
    db.select().from(phoneStoreUrls).where(eq(phoneStoreUrls.phoneId, id)),
  ]);

  if (phoneRows.length === 0) return null;

  return buildAppPhone(phoneRows[0], priceRows, storeUrlRows[0] ?? null);
}

/** Sadece storeUrls döndürür (fiyat API'si için hafif sorgu). */
export async function getPhoneStoreUrls(
  id: string,
): Promise<AppPhone["storeUrls"] | null> {
  const rows = await db
    .select()
    .from(phoneStoreUrls)
    .where(eq(phoneStoreUrls.phoneId, id));

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    amazon: row.amazon ?? undefined,
    trendyol: row.trendyol ?? undefined,
    hepsiburada: row.hepsiburada ?? undefined,
  };
}

/** Tüm telefon ID'lerini döndürür (generateStaticParams için). */
export async function getAllPhoneIds(): Promise<string[]> {
  const rows = await db.select({ id: phones.id }).from(phones);
  return rows.map((r) => r.id);
}
