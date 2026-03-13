/* eslint-disable @next/next/no-img-element */
import { notFound } from 'next/navigation';
import { mockPhones } from '../../data/mockPhones';
import styles from './page.module.css';

interface PageProps {
    params: {
        id: string;
    };
}

interface LivePrice {
    store: string;
    price: number;
    currency: string;
    url: string;
    updatedAt: string;
}

async function getLivePrices(id: string): Promise<LivePrice[] | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/prices/${id}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.error) return null;
        return data as LivePrice[];
    } catch {
        return null;
    }
}

export default async function PhoneDetail({ params }: PageProps) {
    const phone = mockPhones.find(p => p.id === params.id);

    if (!phone) {
        notFound();
    }

    // Try to get live prices; fall back to mock prices if unavailable
    const livePrices = await getLivePrices(params.id);
    const displayPrices: LivePrice[] = livePrices && livePrices.length > 0
        ? livePrices
        : phone.prices
            .filter(p => p.price != null)
            .map(p => ({ ...p }))
            .sort((a, b) => a.price - b.price);

    const isLive = livePrices !== null && livePrices.length > 0;
    const lowestPrice = displayPrices[0] ?? null;
    const lastUpdated = lowestPrice?.updatedAt
        ? new Date(lowestPrice.updatedAt).toLocaleString('tr-TR')
        : null;

    return (
        <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* Product Header Section */}
            <section className={styles.productHeader}>
                <div className={`glass-panel ${styles.imageContainer}`}>
                    <img src={phone.imageUrl} alt={phone.model} className={styles.image} />
                </div>

                <div className={styles.productInfo}>
                    <div className={styles.brandBadge}>{phone.brand}</div>
                    <h1 className={styles.title}>{phone.model}</h1>
                    <p className={styles.releaseDate}>Çıkış Tarihi: {phone.releaseDate}</p>

                    <div className={`glass-panel ${styles.priceWidget}`}>
                        <h3 className={styles.widgetTitle}>En Düşük Fiyat</h3>
                        {lowestPrice ? (
                            <div className={styles.priceHighlight}>
                                <span className={styles.currency}>{lowestPrice.currency}</span>
                                <span className={styles.amount}>{new Intl.NumberFormat('tr-TR').format(lowestPrice.price)}</span>
                                <span className={styles.store}>👉 {lowestPrice.store}&apos;da</span>
                            </div>
                        ) : (
                            <div className={styles.outOfStock}>Şu an satışı yok</div>
                        )}
                        <a
                            href={lowestPrice?.url ?? '#'}
                            className={styles.compareBtn}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                        >
                            Satın Al →
                        </a>
                    </div>
                </div>
            </section>

            {/* Specifications & Prices Grids */}
            <div className={styles.detailsGrid}>

                {/* Specifications */}
                <section className={styles.specSection}>
                    <h2 className={styles.sectionTitle}>Teknik Özellikler</h2>
                    <div className="glass-panel">
                        <table className={styles.specTable}>
                            <tbody>
                                <tr>
                                    <th>Ekran</th>
                                    <td>{phone.specifications.Display?.Size || "N/A"}<br /><small>{phone.specifications.Display?.Type?.split(',')[1] || phone.specifications.Display?.Type || "N/A"}</small></td>
                                </tr>
                                <tr>
                                    <th>İşlemci</th>
                                    <td>{phone.specifications.Platform?.Chipset || "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Bellek / Depolama</th>
                                    <td>{phone.specifications.Memory?.Internal?.split(',')[0] || "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Kamera</th>
                                    <td>{phone.specifications?.["Main Camera"]?.Modules || phone.specifications?.["Main Camera"]?.Single || phone.specifications?.["Main Camera"]?.["Dual"] || phone.specifications?.["Main Camera"]?.["Triple"] || phone.specifications?.["Main Camera"]?.["Quad"] || "N/A"}<br /><small>Ön: {phone.specifications?.["Selfie camera"]?.Single || phone.specifications?.["Selfie camera"]?.Modules || "N/A"}</small></td>
                                </tr>
                                <tr>
                                    <th>Batarya</th>
                                    <td>{phone.specifications.Battery?.Type || "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>İşletim Sistemi</th>
                                    <td>{phone.specifications.Platform?.OS || "N/A"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Ekran Özellikleri */}
                {(phone.specifications.Display?.['Ekran Boyutu'] || phone.specifications.Display?.['Ekran Teknolojisi']) && (
                    <section className={styles.specSection}>
                        <h2 className={styles.sectionTitle}>Ekran Özellikleri</h2>
                        <div className="glass-panel">
                            <table className={styles.specTable}>
                                <tbody>
                                    {phone.specifications.Display['Ekran Boyutu'] && (
                                        <tr>
                                            <th>Ekran Boyutu</th>
                                            <td>{phone.specifications.Display['Ekran Boyutu']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Teknolojisi'] && (
                                        <tr>
                                            <th>Ekran Teknolojisi</th>
                                            <td>{phone.specifications.Display['Ekran Teknolojisi']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Çözünürlüğü'] && (
                                        <tr>
                                            <th>Ekran Çözünürlüğü</th>
                                            <td>{phone.specifications.Display['Ekran Çözünürlüğü']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Çözünürlüğü Standardı'] && (
                                        <tr>
                                            <th>Çözünürlük Standardı</th>
                                            <td>{phone.specifications.Display['Ekran Çözünürlüğü Standardı']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Piksel Yoğunluğu'] && (
                                        <tr>
                                            <th>Piksel Yoğunluğu</th>
                                            <td>{phone.specifications.Display['Piksel Yoğunluğu']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Yenileme Hızı'] && (
                                        <tr>
                                            <th>Ekran Yenileme Hızı</th>
                                            <td>{phone.specifications.Display['Ekran Yenileme Hızı']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Oranı'] && (
                                        <tr>
                                            <th>Ekran Oranı (Aspect Ratio)</th>
                                            <td>{phone.specifications.Display['Ekran Oranı']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Alanı'] && (
                                        <tr>
                                            <th>Ekran Alanı</th>
                                            <td>{phone.specifications.Display['Ekran Alanı']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Dayanıklılığı'] && (
                                        <tr>
                                            <th>Ekran Dayanıklılığı</th>
                                            <td>{phone.specifications.Display['Ekran Dayanıklılığı']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Renk Sayısı'] && (
                                        <tr>
                                            <th>Renk Sayısı</th>
                                            <td>{phone.specifications.Display['Renk Sayısı']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran / Gövde Oranı'] && (
                                        <tr>
                                            <th>Ekran / Gövde Oranı</th>
                                            <td>{phone.specifications.Display['Ekran / Gövde Oranı']}</td>
                                        </tr>
                                    )}
                                    {phone.specifications.Display['Ekran Özellikleri'] && (
                                        <tr>
                                            <th>Diğer Ekran Özellikleri</th>
                                            <td>
                                                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                                                    {phone.specifications.Display['Ekran Özellikleri'].split(',').map((prop: string, idx: number) => (
                                                        <li key={idx}>{prop.trim()}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* Prices Comparison */}
                <section className={styles.priceSection}>
                    <h2 className={styles.sectionTitle}>
                        Mağaza Fiyatları
                        {isLive && (
                            <span style={{
                                marginLeft: '0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                padding: '0.2rem 0.6rem',
                                borderRadius: '999px',
                                background: 'rgba(74, 222, 128, 0.15)',
                                color: '#4ade80',
                                border: '1px solid rgba(74, 222, 128, 0.3)',
                                verticalAlign: 'middle',
                            }}>
                                🟢 Canlı
                            </span>
                        )}
                    </h2>
                    <div className={`glass-panel ${styles.priceList}`}>
                        {displayPrices.length > 0 ? (
                            <>
                                {displayPrices.map((price, idx) => (
                                    <div key={idx} className={styles.priceItem}>
                                        <div className={styles.storeName}>{price.store}</div>
                                        <div className={styles.priceValue}>
                                            {new Intl.NumberFormat('tr-TR').format(price.price)} {price.currency}
                                        </div>
                                        <a href={price.url} className={styles.buyBtn} target="_blank" rel="noreferrer">Satın Al</a>
                                    </div>
                                ))}
                                {lastUpdated && (
                                    <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '1rem', textAlign: 'right' }}>
                                        Son güncelleme: {lastUpdated}
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className={styles.noPrices}>Satışta olan mağaza bulunamadı.</p>
                        )}
                    </div>
                </section>
            </div>

        </div>
    );
}

export function generateStaticParams() {
    return mockPhones.map((phone) => ({
        id: phone.id,
    }));
}
