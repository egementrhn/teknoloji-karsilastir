/* eslint-disable @next/next/no-img-element */
"use client";

import { useCompare } from "../context/CompareContext";
import type { Phone } from "../data/mockPhones";
import styles from "./page.module.css";
import Link from "next/link";

interface CompareClientProps {
  allPhones: Phone[];
}

type SpecRow = {
  label: string;
  getValue: (p: Phone) => string;
  sub?: (p: Phone) => string;
};

const specRows: SpecRow[] = [
  { label: "Marka", getValue: (p) => p.brand },
  {
    label: "Ekran",
    getValue: (p) => p.specifications.Display?.Size || "N/A",
    sub: (p) =>
      p.specifications.Display?.Type?.split(",")[1]?.trim() ||
      p.specifications.Display?.Type ||
      "",
  },
  {
    label: "İşlemci",
    getValue: (p) => p.specifications.Platform?.Chipset || "N/A",
  },
  {
    label: "Bellek / Depolama",
    getValue: (p) =>
      p.specifications.Memory?.Internal?.split(",")[0] || "N/A",
  },
  {
    label: "Kamera",
    getValue: (p) =>
      p.specifications?.["Main Camera"]?.Modules ||
      p.specifications?.["Main Camera"]?.Single ||
      p.specifications?.["Main Camera"]?.["Dual"] ||
      p.specifications?.["Main Camera"]?.["Triple"] ||
      p.specifications?.["Main Camera"]?.["Quad"] ||
      "N/A",
    sub: (p) =>
      `Ön: ${
        p.specifications?.["Selfie camera"]?.Single ||
        p.specifications?.["Selfie camera"]?.Modules ||
        "N/A"
      }`,
  },
  {
    label: "Batarya",
    getValue: (p) => p.specifications.Battery?.Type || "N/A",
  },
  {
    label: "İşletim Sistemi",
    getValue: (p) => p.specifications.Platform?.OS || "N/A",
  },
  {
    label: "Çıkış Yılı",
    getValue: (p) => p.releaseDate || "N/A",
  },
  {
    label: "Ağ",
    getValue: (p) => p.specifications.Network?.Technology || "N/A",
  },
  {
    label: "Boyutlar",
    getValue: (p) => p.specifications.Body?.Dimensions || "N/A",
  },
  {
    label: "Ağırlık",
    getValue: (p) => p.specifications.Body?.Weight || "N/A",
  },
  {
    label: "Ekran Koruma",
    getValue: (p) => p.specifications.Display?.Protection || "N/A",
  },
  {
    label: "Yenileme Hızı",
    getValue: (p) => p.specifications.Display?.["Ekran Yenileme Hızı"] || "N/A",
  },
  {
    label: "Wi-Fi",
    getValue: (p) => p.specifications.Comms?.WLAN || "N/A",
  },
  {
    label: "Bluetooth",
    getValue: (p) => p.specifications.Comms?.Bluetooth || "N/A",
  },
  {
    label: "NFC",
    getValue: (p) => p.specifications.Comms?.NFC || "N/A",
  },
  {
    label: "USB",
    getValue: (p) => p.specifications.Comms?.USB || "N/A",
  },
  {
    label: "Renkler",
    getValue: (p) => p.specifications.Misc?.Colors || "N/A",
  },
];

export default function CompareClient({ allPhones }: CompareClientProps) {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  const phonesToCompare = compareList
    .map((id) => allPhones.find((p) => p.id === id))
    .filter((p): p is Phone => p !== undefined);

  if (phonesToCompare.length === 0) {
    return (
      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        <header className={styles.header}>
          <h1 className="gradient-text">Akıllı Telefon Karşılaştırma</h1>
          <p className={styles.subtitle}>
            İstediğiniz cihazları yan yana koyarak teknik detayları kıyaslayın.
          </p>
        </header>
        <div className={styles.emptyState}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <h2>Karşılaştırma Listeniz Boş</h2>
          <p>
            Ana sayfadaki telefon kartlarında bulunan{" "}
            <strong>&quot;Karşılaştır&quot;</strong> butonuna tıklayarak
            telefonları buraya ekleyebilirsiniz.
          </p>
          <Link href="/" className={styles.goBackBtn}>
            Telefonlara Göz At
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem 1.5rem" }}>
      <header className={styles.header}>
        <h1 className="gradient-text">Akıllı Telefon Karşılaştırma</h1>
        <p className={styles.subtitle}>
          {phonesToCompare.length} cihaz karşılaştırılıyor
          <button className={styles.clearBtn} onClick={clearCompare}>
            Listeyi Temizle
          </button>
        </p>
      </header>

      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table className={styles.compareTable}>
          <thead>
            <tr>
              <th className={styles.featureCol}>Özellikler</th>
              {phonesToCompare.map((phone) => (
                <th key={phone.id} className={styles.productCol}>
                  <div className={styles.productHeader}>
                    <img
                      src={phone.imageUrl}
                      alt={phone.model}
                      className={styles.productImg}
                    />
                    <Link href={`/telefon/${phone.id}`}>
                      <h3 className={styles.productName}>{phone.model}</h3>
                    </Link>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCompare(phone.id)}
                    >
                      ✕ Kaldır
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specRows.map((row) => {
              const values = phonesToCompare.map((p) => row.getValue(p));
              const allSame = values.every((v) => v === values[0]);

              return (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {phonesToCompare.map((phone, idx) => (
                    <td
                      key={phone.id}
                      className={
                        !allSame && phonesToCompare.length > 1
                          ? values[idx] ===
                            [...values].sort(
                              (a, b) => b.localeCompare(a)
                            )[0]
                            ? styles.cellBetter
                            : ""
                          : ""
                      }
                    >
                      {row.getValue(phone)}
                      {row.sub && <small>{row.sub(phone)}</small>}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
