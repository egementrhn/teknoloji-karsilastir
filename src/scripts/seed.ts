import { createClient } from "@libsql/client";
import { mockPhones } from "../app/data/mockPhones";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function createSchema() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS phones (
      id           TEXT PRIMARY KEY,
      brand        TEXT NOT NULL,
      model        TEXT NOT NULL,
      image_url    TEXT NOT NULL,
      release_date TEXT NOT NULL,
      specifications TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS phone_prices (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      phone_id   TEXT    NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
      store      TEXT    NOT NULL,
      price      REAL,
      currency   TEXT    NOT NULL DEFAULT '₺',
      url        TEXT    NOT NULL,
      updated_at TEXT    NOT NULL
    );

    CREATE TABLE IF NOT EXISTS phone_store_urls (
      phone_id    TEXT PRIMARY KEY REFERENCES phones(id) ON DELETE CASCADE,
      amazon      TEXT,
      trendyol    TEXT,
      hepsiburada TEXT
    );
  `);

  console.log("✅ Schema created");
}

async function seed() {
  console.log(`🌱 Seeding ${mockPhones.length} phones…`);

  for (const phone of mockPhones) {
    // 1. phones
    await db.execute({
      sql: `INSERT OR REPLACE INTO phones (id, brand, model, image_url, release_date, specifications)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        phone.id,
        phone.brand,
        phone.model,
        phone.imageUrl,
        phone.releaseDate,
        JSON.stringify(phone.specifications),
      ],
    });

    // 2. phone_prices  (önce sil, sonra ekle)
    await db.execute({
      sql: "DELETE FROM phone_prices WHERE phone_id = ?",
      args: [phone.id],
    });

    for (const price of phone.prices) {
      await db.execute({
        sql: `INSERT INTO phone_prices (phone_id, store, price, currency, url, updated_at)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          phone.id,
          price.store,
          price.price,
          price.currency,
          price.url,
          price.updatedAt,
        ],
      });
    }

    // 3. phone_store_urls
    await db.execute({
      sql: `INSERT OR REPLACE INTO phone_store_urls (phone_id, amazon, trendyol, hepsiburada)
            VALUES (?, ?, ?, ?)`,
      args: [
        phone.id,
        phone.storeUrls.amazon ?? null,
        phone.storeUrls.trendyol ?? null,
        phone.storeUrls.hepsiburada ?? null,
      ],
    });

    console.log(`  ✓ ${phone.brand} ${phone.model}`);
  }

  console.log("🎉 Seed complete!");
}

createSchema()
  .then(seed)
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
