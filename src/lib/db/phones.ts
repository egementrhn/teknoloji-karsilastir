import { db } from "./client";
import type {
  Phone,
  PhoneSpecification,
  PriceInfo,
} from "../../app/data/mockPhones";

// ─── Row shapes returned from the DB ────────────────────────────────────────

interface PhoneRow {
  id: string;
  brand: string;
  model: string;
  image_url: string;
  release_date: string;
  specifications: string; // JSON
}

interface PriceRow {
  store: string;
  price: number | null;
  currency: string;
  url: string;
  updated_at: string;
}

interface StoreUrlRow {
  amazon: string | null;
  trendyol: string | null;
  hepsiburada: string | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function rowToPhone(
  row: PhoneRow,
  prices: PriceRow[],
  storeUrls: StoreUrlRow | null,
): Phone {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    imageUrl: row.image_url,
    releaseDate: row.release_date,
    specifications: JSON.parse(row.specifications) as PhoneSpecification,
    prices: prices
      .filter((p) => p.price !== null)
      .map(
        (p): PriceInfo => ({
          store: p.store,
          price: p.price as number,
          currency: p.currency,
          url: p.url,
          updatedAt: p.updated_at,
        }),
      ),
    storeUrls: {
      amazon: storeUrls?.amazon ?? undefined,
      trendyol: storeUrls?.trendyol ?? undefined,
      hepsiburada: storeUrls?.hepsiburada ?? undefined,
    },
  };
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/** Tüm telefonları döndürür (listing sayfaları için). */
export async function getAllPhones(): Promise<Phone[]> {
  const [phonesResult, pricesResult, storeUrlsResult] = await Promise.all([
    db.execute("SELECT * FROM phones ORDER BY release_date DESC, brand, model"),
    db.execute("SELECT * FROM phone_prices"),
    db.execute("SELECT * FROM phone_store_urls"),
  ]);

  const pricesByPhoneId = new Map<string, PriceRow[]>();
  for (const row of pricesResult.rows) {
    const phoneId = row.phone_id as string;
    if (!pricesByPhoneId.has(phoneId)) pricesByPhoneId.set(phoneId, []);
    pricesByPhoneId.get(phoneId)!.push({
      store: row.store as string,
      price: row.price as number | null,
      currency: row.currency as string,
      url: row.url as string,
      updated_at: row.updated_at as string,
    });
  }

  const storeUrlsByPhoneId = new Map<string, StoreUrlRow>();
  for (const row of storeUrlsResult.rows) {
    storeUrlsByPhoneId.set(row.phone_id as string, {
      amazon: row.amazon as string | null,
      trendyol: row.trendyol as string | null,
      hepsiburada: row.hepsiburada as string | null,
    });
  }

  return phonesResult.rows.map((row) => {
    const phoneRow = row as unknown as PhoneRow;
    return rowToPhone(
      phoneRow,
      pricesByPhoneId.get(phoneRow.id) ?? [],
      storeUrlsByPhoneId.get(phoneRow.id) ?? null,
    );
  });
}

/** Tek bir telefonu ID ile döndürür. */
export async function getPhoneById(id: string): Promise<Phone | null> {
  const [phoneResult, pricesResult, storeUrlsResult] = await Promise.all([
    db.execute({ sql: "SELECT * FROM phones WHERE id = ?", args: [id] }),
    db.execute({
      sql: "SELECT * FROM phone_prices WHERE phone_id = ?",
      args: [id],
    }),
    db.execute({
      sql: "SELECT * FROM phone_store_urls WHERE phone_id = ?",
      args: [id],
    }),
  ]);

  if (phoneResult.rows.length === 0) return null;

  const phoneRow = phoneResult.rows[0] as unknown as PhoneRow;
  const prices: PriceRow[] = pricesResult.rows.map((row) => ({
    store: row.store as string,
    price: row.price as number | null,
    currency: row.currency as string,
    url: row.url as string,
    updated_at: row.updated_at as string,
  }));
  const storeUrlRow =
    storeUrlsResult.rows.length > 0
      ? (storeUrlsResult.rows[0] as unknown as StoreUrlRow)
      : null;

  return rowToPhone(phoneRow, prices, storeUrlRow);
}

/** Sadece storeUrls alanını döndürür (fiyat API'si için hafif sorgu). */
export async function getPhoneStoreUrls(
  id: string,
): Promise<Phone["storeUrls"] | null> {
  const result = await db.execute({
    sql: "SELECT amazon, trendyol, hepsiburada FROM phone_store_urls WHERE phone_id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    amazon: (row.amazon as string | null) ?? undefined,
    trendyol: (row.trendyol as string | null) ?? undefined,
    hepsiburada: (row.hepsiburada as string | null) ?? undefined,
  };
}

/** Tüm telefon ID'lerini döndürür (generateStaticParams için). */
export async function getAllPhoneIds(): Promise<string[]> {
  const result = await db.execute("SELECT id FROM phones");
  return result.rows.map((row) => row.id as string);
}
