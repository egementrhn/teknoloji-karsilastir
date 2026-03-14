import { getAllPhones } from "@/lib/db/phones";
import PhoneCard from "../components/PhoneCard";
import styles from "./page.module.css";

export const revalidate = 3600;

export default async function Telefons() {
  const phones = await getAllPhones();

  return (
    <div className="container" style={{ padding: "2rem 1.5rem" }}>
      <header className={styles.header}>
        <h1 className="gradient-text">Tüm Cihazlar</h1>
        <p className={styles.subtitle}>
          Sizin için listelediğimiz {phones.length} akıllı telefonu inceleyin.
        </p>
      </header>

      <div className={styles.layout}>
        {/* Filters Sidebar */}
        <aside className={`glass-panel ${styles.sidebar}`}>
          <h3 className={styles.filterTitle}>Filtreler</h3>

          <div className={styles.filterGroup}>
            <h4 className={styles.filterLabel}>Marka</h4>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Apple
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Samsung
            </label>
          </div>

          <div className={styles.filterGroup}>
            <h4 className={styles.filterLabel}>Fiyat Aralığı</h4>
            <input
              type="range"
              className={styles.rangeInput}
              min="10000"
              max="100000"
            />
            <div className={styles.rangeValue}>10.000 ₺ - 100.000 ₺</div>
          </div>

          <button className={styles.applyBtn}>Uygula</button>
        </aside>

        {/* Results Grid */}
        <main className={styles.main}>
          <div className={styles.actionBar}>
            <span className={styles.resultCount}>
              <strong>{phones.length}</strong> sonuç bulundu
            </span>
            <select className={styles.sortSelect} defaultValue="newest">
              <option value="newest">En Yeniler</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>

          <div className={styles.grid}>
            {phones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
