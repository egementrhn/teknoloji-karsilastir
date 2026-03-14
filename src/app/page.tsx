import { getAllPhones } from "@/lib/db/phones";
import PhoneCard from "./components/PhoneCard";
import styles from "./page.module.css";

export const revalidate = 3600;

export default async function Home() {
  const phones = await getAllPhones();

  return (
    <>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className="gradient-text">Geleceğin Teknolojisini Seçin</h1>
          <p className={styles.subtitle}>
            Binlerce akıllı telefonun özelliklerini keşfedin, ihtiyacınıza en
            uygun olanı bulun ve fiyatları karşılaştırın.
          </p>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="iPhone 15 Pro, Galaxy S24 Ultra..."
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Cihaz Ara</button>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: "4rem" }}>
        <h2 style={{ marginBottom: "2rem" }}>Tüm Telefonlar</h2>
        <div className={styles.grid}>
          {phones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>
    </>
  );
}
