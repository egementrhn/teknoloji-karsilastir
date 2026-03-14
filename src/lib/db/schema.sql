CREATE TABLE IF NOT EXISTS phones (
  id           TEXT PRIMARY KEY,
  brand        TEXT NOT NULL,
  model        TEXT NOT NULL,
  image_url    TEXT NOT NULL DEFAULT '',
  release_date TEXT NOT NULL DEFAULT '',
  specifications TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS phone_prices (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_id   TEXT    NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
  store      TEXT    NOT NULL,
  price      REAL,
  currency   TEXT    NOT NULL DEFAULT '₺',
  url        TEXT    NOT NULL DEFAULT '',
  updated_at TEXT    NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS phone_store_urls (
  phone_id    TEXT PRIMARY KEY REFERENCES phones(id) ON DELETE CASCADE,
  amazon      TEXT,
  trendyol    TEXT,
  hepsiburada TEXT
);

CREATE INDEX IF NOT EXISTS idx_phone_prices_phone_id ON phone_prices(phone_id);
