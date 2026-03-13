/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, getLowestPrice } from '../data/mockPhones';
import { useCompare } from '../context/CompareContext';
import styles from './PhoneCard.module.css';

interface PhoneCardProps {
    phone: Phone;
}

function parseStorageOptions(internal: string | undefined): string[] {
    if (!internal) return [];
    const cleanedInternal = internal.split('|')[0].trim();
    const variants = cleanedInternal.split(',').map(v => v.trim());
    const storageOptions = variants
        .map(v => {
            const match = v.match(/^(\d+\s*(?:GB|TB))/i);
            return match ? match[1] : null;
        })
        .filter((v): v is string => v !== null);
    return Array.from(new Set(storageOptions));
}

function parseColorOptions(colors: string | undefined): { name: string; css: string }[] {
    if (!colors) return [];
    const colorMap: Record<string, string> = {
        // Generic
        'black': '#1a1a1a',
        'white': '#f5f5f5',
        'blue': '#3b82f6',
        'green': '#22c55e',
        'yellow': '#eab308',
        'pink': '#ec4899',
        'red': '#ef4444',
        'gray': '#9ca3af',
        'grey': '#9ca3af',
        'mint': '#a7f3d0',
        'graphite': '#4b5563',
        'purple': '#a855f7',
        'orange': '#f97316',
        'violet': '#8b5cf6',
        // Apple Titanium
        'black titanium': '#3a3a3c',
        'white titanium': '#e8e5e0',
        'blue titanium': '#3e4f5e',
        'natural titanium': '#a5a296',
        // Samsung Titanium
        'titanium black': '#2c2c2c',
        'titanium gray': '#8a8a8a',
        'titanium grey': '#8a8a8a',
        'titanium violet': '#a78bbd',
        'titanium yellow': '#e8d44d',
        'titanium blue': '#5a7dba',
        'titanium green': '#6b9f78',
        'titanium orange': '#e8915a',
        // Samsung Misc
        'onyx black': '#1c1c1e',
        'marble grey': '#b0b0b0',
        'cobalt violet': '#7c5cbf',
        'amber yellow': '#f5b731',
        'jade green': '#4ea87a',
        'sandstone orange': '#d4894e',
        'sapphire blue': '#2e5fa1',
    };

    return colors.split(',').map(c => {
        const name = c.trim();
        const key = name.toLowerCase();
        const css = colorMap[key] || '#888';
        return { name, css };
    });
}

export default function PhoneCard({ phone }: PhoneCardProps) {
    const lowestPrice = getLowestPrice(phone.prices);
    const [imgError, setImgError] = useState(false);
    const storageOptions = parseStorageOptions(phone.specifications.Memory?.Internal);
    const [selectedStorage, setSelectedStorage] = useState(storageOptions[0] || '');
    const { toggleCompare, isInCompare } = useCompare();
    const inCompare = isInCompare(phone.id);
    const colorOptions = parseColorOptions(phone.specifications.Misc?.Colors);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.name || '');

    return (
        <Link href={`/telefon/${phone.id}`} className={`glass-panel ${styles.card}`}>
            <div className={styles.imageContainer}>
                {imgError ? (
                    <div className={styles.placeholder}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                        </svg>
                        <span className={styles.placeholderText}>{phone.model}</span>
                    </div>
                ) : (
                    <img
                        src={phone.imageUrl}
                        alt={phone.model}
                        className={styles.image}
                        onError={() => setImgError(true)}
                    />
                )}
            </div>

            <div className={styles.controlBar}>
                <div className={styles.controlLeft}>
                    {storageOptions.length > 0 && (
                        <div className={styles.storageSelector}>
                            {storageOptions.map((option) => (
                                <button
                                    key={option}
                                    className={`${styles.storageOption} ${selectedStorage === option ? styles.storageOptionActive : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedStorage(option);
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {colorOptions.length > 0 && (
                        <div className={styles.colorSelector}>
                            {colorOptions.map((color) => (
                                <button
                                    key={color.name}
                                    className={`${styles.colorSwatch} ${selectedColor === color.name ? styles.colorSwatchActive : ''}`}
                                    style={{ backgroundColor: color.css }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedColor(color.name);
                                    }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <button
                    className={`${styles.compareBtn} ${inCompare ? styles.compareBtnActive : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCompare(phone.id);
                    }}
                    title={inCompare ? 'Karşılaştırmadan çıkar' : 'Karşılaştırmaya ekle'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <span>{inCompare ? 'Eklendi' : 'Karşılaştır'}</span>
                </button>
            </div>

            <div className={styles.content}>
                <div className={styles.brand}>{phone.brand}</div>
                <h3 className={styles.model}>{phone.model}</h3>

                <div className={styles.specs}>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>Ekran:</span>
                        <span className={styles.specValue}>{phone.specifications.Display?.Size?.split(',')[0] || 'N/A'}</span>
                    </div>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>İşlemci:</span>
                        <span className={styles.specValue}>{phone.specifications.Platform?.Chipset || 'N/A'}</span>
                    </div>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>Bellek:</span>
                        <span className={styles.specValue}>{selectedStorage || phone.specifications.Memory?.Internal?.split(',')[0] || 'N/A'}</span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.priceContainer}>
                        <span className={styles.priceLabel}>Başlangıç</span>
                        {lowestPrice ? (
                            <span className={styles.price}>
                                {new Intl.NumberFormat('tr-TR').format(lowestPrice.price)} {lowestPrice.currency}
                            </span>
                        ) : (
                            <span className={styles.price}>Stokta Yok</span>
                        )}
                    </div>

                    <div className={styles.actionBtn}>İncele</div>
                </div>
            </div>
        </Link>
    );
}
