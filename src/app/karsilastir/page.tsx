/* eslint-disable @next/next/no-img-element */
'use client';

import { mockPhones } from '../data/mockPhones';
import { useCompare } from '../context/CompareContext';
import styles from './page.module.css';
import Link from 'next/link';

export default function Compare() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();

    const phonesToCompare = compareList
        .map(id => mockPhones.find(p => p.id === id))
        .filter(Boolean);

    if (phonesToCompare.length === 0) {
        return (
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <header className={styles.header}>
                    <h1 className="gradient-text">Akıllı Telefon Karşılaştırma</h1>
                    <p className={styles.subtitle}>İstediğiniz cihazları yan yana koyarak teknik detayları kıyaslayın.</p>
                </header>
                <div className={styles.emptyState}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <h2>Karşılaştırma Listeniz Boş</h2>
                    <p>Ana sayfadaki telefon kartlarında bulunan <strong>&quot;Karşılaştır&quot;</strong> butonuna tıklayarak telefonları buraya ekleyebilirsiniz.</p>
                    <Link href="/" className={styles.goBackBtn}>
                        Telefonlara Göz At
                    </Link>
                </div>
            </div>
        );
    }

    const specRows = [
        { label: 'Marka', getValue: (p: typeof mockPhones[0]) => p.brand },
        { label: 'Ekran', getValue: (p: typeof mockPhones[0]) => `${p.specifications.Display?.Size || 'N/A'}`, sub: (p: typeof mockPhones[0]) => p.specifications.Display?.Type?.split(',')[1]?.trim() || p.specifications.Display?.Type || '' },
        { label: 'İşlemci', getValue: (p: typeof mockPhones[0]) => p.specifications.Platform?.Chipset || 'N/A' },
        { label: 'Bellek / Depolama', getValue: (p: typeof mockPhones[0]) => p.specifications.Memory?.Internal?.split(',')[0] || 'N/A' },
        { label: 'Kamera', getValue: (p: typeof mockPhones[0]) => p.specifications?.["Main Camera"]?.Modules || p.specifications?.["Main Camera"]?.Single || p.specifications?.["Main Camera"]?.["Dual"] || p.specifications?.["Main Camera"]?.["Triple"] || p.specifications?.["Main Camera"]?.["Quad"] || 'N/A', sub: (p: typeof mockPhones[0]) => `Ön: ${p.specifications?.["Selfie camera"]?.Single || p.specifications?.["Selfie camera"]?.Modules || 'N/A'}` },
        { label: 'Batarya', getValue: (p: typeof mockPhones[0]) => p.specifications.Battery?.Type || 'N/A' },
        { label: 'İşletim Sistemi', getValue: (p: typeof mockPhones[0]) => p.specifications.Platform?.OS || 'N/A' },
    ];

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <header className={styles.header}>
                <h1 className="gradient-text">Akıllı Telefon Karşılaştırma</h1>
                <p className={styles.subtitle}>
                    {phonesToCompare.length} cihaz karşılaştırılıyor
                    <button className={styles.clearBtn} onClick={clearCompare}>
                        Listeyi Temizle
                    </button>
                </p>
            </header>

            <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table className={styles.compareTable}>
                    <thead>
                        <tr>
                            <th className={styles.featureCol}>Özellikler</th>
                            {phonesToCompare.map((phone) => (
                                <th key={phone!.id} className={styles.productCol}>
                                    <div className={styles.productHeader}>
                                        <img src={phone!.imageUrl} alt={phone!.model} className={styles.productImg} />
                                        <Link href={`/telefon/${phone!.id}`}>
                                            <h3 className={styles.productName}>{phone!.model}</h3>
                                        </Link>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeFromCompare(phone!.id)}
                                        >
                                            ✕ Kaldır
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {specRows.map((row) => (
                            <tr key={row.label}>
                                <th>{row.label}</th>
                                {phonesToCompare.map((phone) => (
                                    <td key={phone!.id}>
                                        {row.getValue(phone!)}
                                        {row.sub && (
                                            <small>{row.sub(phone!)}</small>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
