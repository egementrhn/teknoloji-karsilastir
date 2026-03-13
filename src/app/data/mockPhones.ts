export interface SpecGroup {
    [key: string]: string;
}

export interface PhoneSpecification {
    Network?: SpecGroup;
    Launch?: SpecGroup;
    Body?: SpecGroup;
    Display?: SpecGroup;
    Platform?: SpecGroup;
    Memory?: SpecGroup;
    "Main Camera"?: SpecGroup;
    "Selfie camera"?: SpecGroup;
    Sound?: SpecGroup;
    Comms?: SpecGroup;
    Features?: SpecGroup;
    Battery?: SpecGroup;
    Misc?: SpecGroup;
    Tests?: SpecGroup;
    [key: string]: SpecGroup | undefined;
}

export interface PriceInfo {
    store: string;
    price: number;
    currency: string;
    url: string;
    updatedAt: string;
}

export interface Phone {
    id: string;
    brand: string;
    model: string;
    imageUrl: string;
    releaseDate: string;
    specifications: PhoneSpecification;
    prices: PriceInfo[];
    storeUrls: {
        amazon?: string;
        trendyol?: string;
        hepsiburada?: string;
    };
}

export const mockPhones: Phone[] = [
    {
        "id": "iphone-15-pro-max",
        "brand": "Apple",
        "model": "iPhone 15 Pro Max",
        "imageUrl": "https://resim.epey.com/894486/apple-iphone-15-pro-max-3.png",
        "releaseDate": "2023",
        "specifications": {
            "Network": {
                "Technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900 | CDMA 800 / 1900",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 | CDMA2000 1xEV-DO",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66 - A3106 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A2849 | 1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A3105 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66 - A3108",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 53, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3106 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 77, 78, 79, 258, 260, 261 SA/NSA/Sub6/mmWave - A2849 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 75, 76, 77, 78, 79 SA/NSA/Sub6 - A3105 | 1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3108",
                "Speed": "HSPA, LTE, 5G, EV-DO Rev.A 3.1 Mbps"
            },
            "Launch": {
                "Announced": "2023, September 12",
                "Status": "Available. Released 2023, September 22"
            },
            "Body": {
                "Dimensions": "159.9 x 76.7 x 8.3 mm (6.30 x 3.02 x 0.33 in)",
                "Weight": "221 g (7.80 oz)",
                "Build": "Glass front, glass back, titanium frame (grade 5)",
                "SIM": "· Nano-SIM + eSIM + eSIM (max 2 at a time; International)· eSIM + eSIM (8 or more, max 2 at a time; USA)· Nano-SIM + Nano-SIM (China) | IP68 dust tight and water resistant (immersible up to 6m for 30 min)\nApple Pay (Visa, MasterCard, AMEX certified)"
            },
            "Display": {
                "Type": "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (typ), 2000 nits (HBM)",
                "Size": "6.7 inches, 110.2 cm2 (~89.8% screen-to-body ratio)",
                "Resolution": "1290 x 2796 pixels, 19.5:9 ratio (~460 ppi density)",
                "Protection": "Ceramic Shield glass",
                "Ekran Boyutu": "6.7 İnç",
                "Ekran Teknolojisi": "OLED",
                "Ekran Çözünürlüğü": "1290x2796 (FHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "FHD+",
                "Piksel Yoğunluğu": "460 PPI",
                "Ekran Yenileme Hızı": "120 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "109.27 cm²",
                "Ekran Özellikleri": "LTPO, Dolby Vision, HDR, Çizilmeye Dirençli Cam, HDR10, Multi Touch, DCI-P3 Renk Uzayı, Oleophobic Coating, Çerçevesiz Tasarım, Sürekli Açık Ekran (Always-on Display), Ekran İçinde Ön Kamera, HLG, Super Retina XDR Display, True Tone Ekran, 2.000.000:1 Kontrast Oranı, 1000 cd/m² Parlaklık, 1600 cd/m² Parlaklık (HDR), 2000 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Ceramic Shield Glass",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "89.1%"
            },
            "Platform": {
                "OS": "iOS 17, upgradable to iOS 26.3",
                "Chipset": "Apple A17 Pro (3 nm)",
                "CPU": "Hexa-core (2x3.78 GHz + 4x2.11 GHz)",
                "GPU": "Apple GPU (6-core graphics)"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "256GB 8GB RAM, 512GB 8GB RAM, 1TB 8GB RAM | NVMe"
            },
            "Main Camera": {
                "Triple": "48 MP, f/1.8, 24mm (wide), 1/1.28\", 1.22µm, dual pixel PDAF, sensor-shift OIS\n12 MP, f/2.8, 120mm (periscope telephoto), 1/3.06\", 1.12µm, dual pixel PDAF, 3D sensor‑shift OIS, 5x optical zoom\n12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4µm, dual pixel PDAF\nTOF 3D LiDAR scanner (depth)",
                "Features": "Dual-LED dual-tone flash, HDR (photo/panorama)",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10-bit HDR, Dolby Vision HDR (up to 60fps), ProRes, 3D (spatial) video, stereo sound rec."
            },
            "Selfie camera": {
                "Single": "12 MP, f/1.9, 23mm (wide), 1/3.6\", 1.0µm, PDAF, OIS\nSL 3D, (depth/biometrics sensor)",
                "Features": "HDR, Dolby Vision HDR",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, hotspot",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS, NavIC",
                "NFC": "Yes",
                "Radio": "No",
                "USB": "USB Type-C 3.2 Gen 2, DisplayPort"
            },
            "Features": {
                "Sensors": "Face ID, accelerometer, gyro, proximity, compass, barometer | Ultra Wideband (UWB) support (gen2 chip)\nEmergency SOS, Messages and Find My via satellite"
            },
            "Battery": {
                "Type": "Li-Ion 4441 mAh",
                "Charging": "Wired, PD2.0, 50% in 30 min\n15W wireless (MagSafe)\n15W wireless (Qi2) - requires iOS 17.2 update\n4.5W reverse wired"
            },
            "Misc": {
                "Colors": "Black Titanium, White Titanium, Blue Titanium, Natural Titanium",
                "Models": "A2849, A3105, A3106, A3108, iPhone16,2",
                "SAR": "1.07 W/kg (head)     1.11 W/kg (body)",
                "SAR EU": "0.98 W/kg (head)     0.98 W/kg (body)",
                "Price": "$ 557.51 / € 655.00 / £ 551.75 / ₹ 154,900"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1487203 (v10)\nGeekBench: 7237 (v6.0)",
                "Display": "1787 nits max brightness (measured)",
                "Camera": "Photo / Video",
                "Loudspeaker": "-24.5 LUFS (Very good)",
                "Battery": "Active use score 16:01h",
                "Battery (old)": "Endurance rating 118h"
            }
        },
        "prices": [],
        "storeUrls": {}
    },
    {
        "id": "galaxy-s24-ultra",
        "brand": "Samsung",
        "model": "Galaxy S24 Ultra",
        "imageUrl": "https://resim.epey.com/899642/samsung-galaxy-s24-ultra-1.png",
        "releaseDate": "2024",
        "specifications": {
            "Network": {
                "Technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900 | CDMA 800 / 1900 & TD-SCDMA",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 | CDMA2000 1xEV-DO",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66 - International | 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 18, 19, 20, 25, 26, 28, 29, 30, 38, 39, 40, 41, 48, 66, 71 - USA",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6 - International | 1, 7, 25, 28, 41, 66, 71, 78, 257, 258, 260, 261 SA/NSA/Sub6/mmWave - USA",
                "Speed": "HSPA, LTE (CA), 5G"
            },
            "Launch": {
                "Announced": "2024, January 17",
                "Status": "Available. Released 2024, January 24"
            },
            "Body": {
                "Dimensions": "162.3 x 79 x 8.6 mm (6.39 x 3.11 x 0.34 in)",
                "Weight": "232 g or 233 g (8.18 oz)",
                "Build": "Glass front (Corning Gorilla Armor), glass back (Corning Gorilla Armor), titanium frame (grade 2)",
                "SIM": "· Nano-SIM + Nano-SIM + eSIM + eSIM (max 2 at a time) - INT· Nano-SIM + eSIM + eSIM (max 2 at a time) - USA· Nano-SIM + Nano-SIM - CN | IP68 dust tight and water resistant (immersible up to 1.5m for 30 min)\nStylus (Bluetooth integration, accelerometer, gyro)"
            },
            "Display": {
                "Type": "Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits (peak)",
                "Size": "6.8 inches, 113.5 cm2 (~88.5% screen-to-body ratio)",
                "Resolution": "1440 x 3120 pixels, 19.5:9 ratio (~505 ppi density)",
                "Protection": "Corning Gorilla Armor | DX anti-reflective coating",
                "Ekran Boyutu": "6.8 İnç",
                "Ekran Teknolojisi": "Dynamic AMOLED 2X",
                "Ekran Çözünürlüğü": "1440x3120 (QHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "QHD+",
                "Piksel Yoğunluğu": "505 PPI",
                "Ekran Yenileme Hızı": "120 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "113.35 cm²",
                "Ekran Özellikleri": "HDR, HDR10+, LTPO, 10 bit Renk Derinliği, 1440 Hz PWM Dimming, 300 Hz Dokunma Tepki Hızı, DCI-P3 Renk Uzayı, Çerçevesiz Tasarım, Ekran İçinde Ön Kamera, Sürekli Açık Ekran (Always-on Display), 2600 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Gorilla Armor",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "88.5%"
            },
            "Platform": {
                "OS": "Android 14, up to 7 major Android upgrades, One UI 8.0",
                "Chipset": "Qualcomm SM8650-AC Snapdragon 8 Gen 3 (4 nm)",
                "CPU": "8-core (1x3.39GHz Cortex-X4 & 3x3.1GHz Cortex-A720 & 2x2.9GHz Cortex-A720 & 2x2.2GHz Cortex-A520)",
                "GPU": "Adreno 750 (1 GHz)"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM | UFS 4.0"
            },
            "Main Camera": {
                "Quad": "200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6µm, multi-directional PDAF, OIS\n10 MP, f/2.4, 67mm (telephoto), 1/3.52\", 1.12µm, PDAF, OIS, 3x optical zoom\n50 MP, f/3.4, 111mm (periscope telephoto), 1/2.52\", 0.7µm, PDAF, OIS, 5x optical zoom\n12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4µm, dual pixel PDAF, Super Steady video",
                "Features": "Laser AF, LED flash, auto-HDR, panorama",
                "Video": "8K@24/30fps, 4K@30/60/120fps, 1080p@30/60/120/240fps, HDR10+, stereo sound rec., gyro-EIS"
            },
            "Selfie camera": {
                "Single": "12 MP, f/2.2, 26mm (wide), 1/3.2\", 1.12µm, dual pixel PDAF",
                "Features": "HDR, HDR10+",
                "Video": "4K@30/60fps, 1080p@30fps"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No | High-bitrate audio support"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS, GLONASS, BDS, GALILEO, QZSS",
                "NFC": "Yes",
                "Radio": "No",
                "USB": "USB Type-C 3.2, DisplayPort 1.2, OTG"
            },
            "Features": {
                "Sensors": "Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer | Samsung DeX, Samsung Wireless DeX (desktop experience support)\nUltra Wideband (UWB) support"
            },
            "Battery": {
                "Type": "Li-Ion 5000 mAh",
                "Charging": "45W wired, PD3.0, 65% in 30 min\n15W wireless (Qi)\n4.5W reverse wireless"
            },
            "Misc": {
                "Colors": "Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow, Titanium Blue, Titanium Green, Titanium Orange",
                "Models": "SM-S928B, SM-S928B/DS, SM-S928U, SM-S928U1, SM-S928W, SM-S928N, SM-S9280, SM-S928E, SM-S928E/DS",
                "SAR": "1.26 W/kg (head)     0.62 W/kg (body)",
                "SAR EU": "1.06 W/kg (head)     1.30 W/kg (body)",
                "Price": "$ 649.95 / € 648.13 / £ 466.00"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1453497 (v9), 1823822 \n(v10)\nGeekBench: 7076 (v6)\n3DMark: 4983 (Wild Life Extreme)",
                "Display": "1447 nits max brightness (measured)",
                "Camera": "Photo / Video",
                "Loudspeaker": "-24.6 LUFS (Very good)",
                "Battery": "Active use score 13:49h"
            }
        },
        "prices": [
            {
                "store": "Amazon",
                "price": 69999,
                "currency": "₺",
                "url": "https://www.amazon.com.tr/Samsung-Galaxy-Ultra-%C3%87ift-5000/dp/B0CNKGPSBM",
                "updatedAt": "2023-11-01T10:00:00Z"
            },
            {
                "store": "Trendyol",
                "price": 68500,
                "currency": "₺",
                "url": "https://www.trendyol.com/samsung/galaxy-s24-ultra-12-gb-ram-256-gb-titanyum-siyah-p-792557582",
                "updatedAt": "2023-11-01T10:15:00Z"
            },
            {
                "store": "Hepsiburada",
                "price": 71999,
                "currency": "₺",
                "url": "https://www.hepsiburada.com/samsung-galaxy-s24-ultra-256-gb-12-gb-ram-samsung-turkiye-garantili-siyah-p-HBCV00005MLL3N",
                "updatedAt": "2023-11-01T08:00:00Z"
            }
        ],
        "storeUrls": {
            "amazon": "https://www.amazon.com.tr/Samsung-Galaxy-Ultra-%C3%87ift-5000/dp/B0CNKGPSBM",
            "trendyol": "https://www.trendyol.com/samsung/galaxy-s24-ultra-12-gb-ram-256-gb-titanyum-siyah-p-792557582",
            "hepsiburada": "https://www.hepsiburada.com/samsung-galaxy-s24-ultra-256-gb-12-gb-ram-samsung-turkiye-garantili-siyah-p-HBCV00005MLL3N"
        }
    },
    {
        "id": "iphone-15",
        "brand": "Apple",
        "model": "iPhone 15",
        "imageUrl": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",
        "releaseDate": "2023",
        "specifications": {
            "Network": {
                "Technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900 | CDMA 800 / 1900",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 | CDMA2000 1xEV-DO",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66 - A3090 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A2846 | 1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A3089 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66 - A3092",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 53, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3090 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 77, 78, 79, 258, 260, 261 SA/NSA/Sub6/mmWave - A2846 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 75, 76, 77, 78, 79 SA/NSA/Sub6 - A3089 | 1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3092",
                "Speed": "HSPA, LTE, 5G, EV-DO Rev.A 3.1 Mbps"
            },
            "Launch": {
                "Announced": "2023, September 12",
                "Status": "Available. Released 2023, September 22"
            },
            "Body": {
                "Dimensions": "147.6 x 71.6 x 7.8 mm (5.81 x 2.82 x 0.31 in)",
                "Weight": "171 g (6.03 oz)",
                "Build": "Glass front, glass back, aluminum frame",
                "SIM": "· Nano-SIM + eSIM + eSIM (max 2 at a time; International)· eSIM + eSIM (8 or more, max 2 at a time; USA)· Nano-SIM + Nano-SIM (China) | IP68 dust tight and water resistant (immersible up to 6m for 30 min)\nApple Pay (Visa, MasterCard, AMEX certified)"
            },
            "Display": {
                "Type": "Super Retina XDR OLED, HDR10, Dolby Vision, 1000 nits (HBM), 2000 nits (peak)",
                "Size": "6.1 inches, 91.3 cm2 (~86.4% screen-to-body ratio)",
                "Resolution": "1179 x 2556 pixels, 19.5:9 ratio (~461 ppi density)",
                "Protection": "Ceramic Shield glass",
                "Ekran Boyutu": "6.1 İnç",
                "Ekran Teknolojisi": "OLED",
                "Ekran Çözünürlüğü": "1179x2556 (FHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "FHD+",
                "Piksel Yoğunluğu": "460 PPI",
                "Ekran Yenileme Hızı": "60 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "91.3 cm²",
                "Ekran Özellikleri": "Dolby Vision, HDR, HDR10, Multi Touch, DCI-P3 Renk Uzayı, Oleophobic Coating, Çerçevesiz Tasarım, Ekran İçinde Ön Kamera, HLG, Super Retina XDR Display, True Tone Ekran, 2.000.000:1 Kontrast Oranı, 1000 cd/m² Parlaklık, 1600 cd/m² Parlaklık (HDR), 2000 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Ceramic Shield Glass",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "85.55%"
            },
            "Platform": {
                "OS": "iOS 17, upgradable to iOS 26.3",
                "Chipset": "Apple A16 Bionic (4 nm)",
                "CPU": "Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth)",
                "GPU": "Apple GPU (5-core graphics)"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM | NVMe"
            },
            "Main Camera": {
                "Dual": "48 MP, f/1.6, 26mm (wide), 1/1.56\", 1.0µm, dual pixel PDAF, sensor-shift OIS\n12 MP, f/2.4, 13mm, 120˚ (ultrawide), 0.7µm",
                "Features": "Dual-LED dual-tone flash, HDR (photo/panorama)",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, HDR, Dolby Vision HDR (up to 60fps), stereo sound rec."
            },
            "Selfie camera": {
                "Single": "12 MP, f/1.9, 23mm (wide), 1/3.6\", 1.0µm, PDAF\nSL 3D, (depth/biometrics sensor)",
                "Features": "HDR, Dolby Vision HDR",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS, GLONASS, GALILEO, BDS, QZSS",
                "NFC": "Yes",
                "Radio": "No",
                "USB": "USB Type-C 2.0, DisplayPort"
            },
            "Features": {
                "Sensors": "Face ID, accelerometer, gyro, proximity, compass, barometer | Ultra Wideband (UWB) support (gen2 chip)\nEmergency SOS, Messages and Find My via satellite"
            },
            "Battery": {
                "Type": "Li-Ion 3349 mAh",
                "Charging": "Wired, PD2.0, 50% in 30 min\n15W wireless (MagSafe)\n15W wireless (Qi2) - requires iOS 17.2 update\n4.5W reverse wired"
            },
            "Misc": {
                "Colors": "Black, Blue, Green, Yellow, Pink",
                "Models": "A3090, A2846, A3089, A3092, iPhone15,4",
                "SAR": "1.12 W/kg (head)     1.14 W/kg (body)",
                "SAR EU": "0.98 W/kg (head)     0.98 W/kg (body)",
                "Price": "$ 348.88 / € 443.50 / £ 367.30 / ₹ 73,399"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1354651 (v10)\nGeekBench: 6526 (v6)\nGFXBench: 60fps (ES 3.1 onscreen)",
                "Display": "1643 nits max brightness (measured)",
                "Camera": "Photo / Video",
                "Loudspeaker": "-26.2 LUFS (Good)",
                "Battery": "Active use score 13:20h",
                "Battery (old)": "Endurance rating 98h"
            }
        },
        "prices": [],
        "storeUrls": {}
    },
    {
        "id": "iphone-15-plus",
        "brand": "Apple",
        "model": "iPhone 15 Plus",
        "imageUrl": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg",
        "releaseDate": "2023",
        "specifications": {
            "Network": {
                "Technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900 | CDMA 800 / 1900",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 | CDMA2000 1xEV-DO",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66 - A3094 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A2847 | 1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A3093 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66 - A3096",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 53, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3094 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 77, 78, 79, 258, 260, 261 SA/NSA/Sub6/mmWave - A2847 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 75, 76, 77, 78, 79 SA/NSA/Sub6 - A3093 | 1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3096",
                "Speed": "HSPA, LTE, 5G, EV-DO Rev.A 3.1 Mbps"
            },
            "Launch": {
                "Announced": "2023, September 12",
                "Status": "Available. Released 2023, September 22"
            },
            "Body": {
                "Dimensions": "160.9 x 77.8 x 7.8 mm (6.33 x 3.06 x 0.31 in)",
                "Weight": "201 g (7.09 oz)",
                "Build": "Glass front, glass back, aluminum frame",
                "SIM": "· Nano-SIM + eSIM + eSIM (max 2 at a time; International)· eSIM + eSIM (8 or more, max 2 at a time; USA)· Nano-SIM + Nano-SIM (China) | IP68 dust tight and water resistant (immersible up to 6m for 30 min)\nApple Pay (Visa, MasterCard, AMEX certified)"
            },
            "Display": {
                "Type": "Super Retina XDR OLED, HDR10, Dolby Vision, 1000 nits (HBM), 2000 nits (peak)",
                "Size": "6.7 inches, 110.2 cm2 (~88.0% screen-to-body ratio)",
                "Resolution": "1290 x 2796 pixels, 19.5:9 ratio (~460 ppi density)",
                "Protection": "Ceramic Shield glass",
                "Ekran Boyutu": "6.7 İnç",
                "Ekran Teknolojisi": "OLED",
                "Ekran Çözünürlüğü": "1290x2796 (FHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "FHD+",
                "Piksel Yoğunluğu": "460 PPI",
                "Ekran Yenileme Hızı": "60 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "108.57 cm²",
                "Ekran Özellikleri": "Dolby Vision, HDR, HDR10, Multi Touch, DCI-P3 Renk Uzayı, Oleophobic Coating, Çerçevesiz Tasarım, Ekran İçinde Ön Kamera, Çizilmeye Dirençli Cam, HLG, Super Retina XDR Display, True Tone Ekran, 2.000.000:1 Kontrast Oranı, 1000 cd/m² Parlaklık, 1600 cd/m² Parlaklık (HDR), 2000 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Ceramic Shield Glass",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "88.0%"
            },
            "Platform": {
                "OS": "iOS 17, upgradable to iOS 26.3",
                "Chipset": "Apple A16 Bionic (4 nm)",
                "CPU": "Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth)",
                "GPU": "Apple GPU (5-core graphics)"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM | NVMe"
            },
            "Main Camera": {
                "Dual": "48 MP, f/1.6, 26mm (wide), 1/1.56\", 1.0µm, dual pixel PDAF, sensor-shift OIS\n12 MP, f/2.4, 13mm, 120˚ (ultrawide), 0.7µm",
                "Features": "Dual-LED dual-tone flash, HDR (photo/panorama)",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, HDR, Dolby Vision HDR (up to 60fps), stereo sound rec."
            },
            "Selfie camera": {
                "Single": "12 MP, f/1.9, 23mm (wide), 1/3.6\", 1.0µm, PDAF\nSL 3D, (depth/biometrics sensor)",
                "Features": "HDR, Dolby Vision HDR",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS, GLONASS, GALILEO, BDS, QZSS",
                "NFC": "Yes",
                "Radio": "No",
                "USB": "USB Type-C 2.0, DisplayPort"
            },
            "Features": {
                "Sensors": "Face ID, accelerometer, gyro, proximity, compass, barometer | Ultra Wideband (UWB) support (gen2 chip)\nEmergency SOS, Messages and Find My via satellite"
            },
            "Battery": {
                "Type": "Li-Ion 4383 mAh",
                "Charging": "Wired, PD2.0, 50% in 30 min\n15W wireless (MagSafe)\n15W wireless (Qi2) - requires iOS 17.2 update\n4.5W reverse wired"
            },
            "Misc": {
                "Colors": "Black, Blue, Green, Yellow, Pink",
                "Models": "A3094, A2847, A3093, A3096, iPhone15,5",
                "SAR": "1.01 W/kg (head)     1.12 W/kg (body)",
                "SAR EU": "0.98 W/kg (head)     0.98 W/kg (body)",
                "Price": "$ 379.81 / € 488.99 / £ 385.00"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1385649 (v10)\nGeekBench: 6618 (v6)\nGFXBench: 60fps (ES 3.1 onscreen)",
                "Display": "1642 nits max brightness (measured)",
                "Camera": "Photo / Video",
                "Loudspeaker": "-27.7 LUFS (Good)",
                "Battery": "Active use score 16:33h",
                "Battery (old)": "Endurance rating 111h"
            }
        },
        "prices": [],
        "storeUrls": {}
    },
    {
        "id": "iphone-15-pro",
        "brand": "Apple",
        "model": "iPhone 15 Pro",
        "imageUrl": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
        "releaseDate": "2023",
        "specifications": {
            "Network": {
                "Technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900 | CDMA 800 / 1900",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 | CDMA2000 1xEV-DO",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66 - A3106 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A2849 | 1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 53, 66, 71 - A3105 | 1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66 - A3108",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 53, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3106 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 77, 78, 79, 258, 260, 261 SA/NSA/Sub6/mmWave - A2849 | 1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 53, 66, 70, 71, 75, 76, 77, 78, 79 SA/NSA/Sub6 - A3105 | 1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6 - A3108",
                "Speed": "HSPA, LTE, 5G, EV-DO Rev.A 3.1 Mbps"
            },
            "Launch": {
                "Announced": "2023, September 12",
                "Status": "Available. Released 2023, September 22"
            },
            "Body": {
                "Dimensions": "159.9 x 76.7 x 8.3 mm (6.30 x 3.02 x 0.33 in)",
                "Weight": "221 g (7.80 oz)",
                "Build": "Glass front, glass back, titanium frame (grade 5)",
                "SIM": "· Nano-SIM + eSIM + eSIM (max 2 at a time; International)· eSIM + eSIM (8 or more, max 2 at a time; USA)· Nano-SIM + Nano-SIM (China) | IP68 dust tight and water resistant (immersible up to 6m for 30 min)\nApple Pay (Visa, MasterCard, AMEX certified)"
            },
            "Display": {
                "Type": "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (typ), 2000 nits (HBM)",
                "Size": "6.7 inches, 110.2 cm2 (~89.8% screen-to-body ratio)",
                "Resolution": "1290 x 2796 pixels, 19.5:9 ratio (~460 ppi density)",
                "Protection": "Ceramic Shield glass",
                "Ekran Boyutu": "6.1 İnç",
                "Ekran Teknolojisi": "OLED",
                "Ekran Çözünürlüğü": "1179x2556 (FHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "FHD+",
                "Piksel Yoğunluğu": "460 PPI",
                "Ekran Yenileme Hızı": "120 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "91.3 cm²",
                "Ekran Özellikleri": "LTPO, Dolby Vision, HDR, Çizilmeye Dirençli Cam, HDR10, Multi Touch, DCI-P3 Renk Uzayı, Oleophobic Coating, Çerçevesiz Tasarım, Sürekli Açık Ekran (Always-on Display), Ekran İçinde Ön Kamera, HLG, Super Retina XDR Display, True Tone Ekran, 2.000.000:1 Kontrast Oranı, 1000 cd/m² Parlaklık, 1600 cd/m² Parlaklık (HDR), 2000 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Ceramic Shield Glass",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "89.1%"
            },
            "Platform": {
                "OS": "iOS 17, upgradable to iOS 26.3",
                "Chipset": "Apple A17 Pro (3 nm)",
                "CPU": "Hexa-core (2x3.78 GHz + 4x2.11 GHz)",
                "GPU": "Apple GPU (6-core graphics)"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "256GB 8GB RAM, 512GB 8GB RAM, 1TB 8GB RAM | NVMe"
            },
            "Main Camera": {
                "Triple": "48 MP, f/1.8, 24mm (wide), 1/1.28\", 1.22µm, dual pixel PDAF, sensor-shift OIS\n12 MP, f/2.8, 120mm (periscope telephoto), 1/3.06\", 1.12µm, dual pixel PDAF, 3D sensor‑shift OIS, 5x optical zoom\n12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4µm, dual pixel PDAF\nTOF 3D LiDAR scanner (depth)",
                "Features": "Dual-LED dual-tone flash, HDR (photo/panorama)",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10-bit HDR, Dolby Vision HDR (up to 60fps), ProRes, 3D (spatial) video, stereo sound rec."
            },
            "Selfie camera": {
                "Single": "12 MP, f/1.9, 23mm (wide), 1/3.6\", 1.0µm, PDAF, OIS\nSL 3D, (depth/biometrics sensor)",
                "Features": "HDR, Dolby Vision HDR",
                "Video": "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, hotspot",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS, NavIC",
                "NFC": "Yes",
                "Radio": "No",
                "USB": "USB Type-C 3.2 Gen 2, DisplayPort"
            },
            "Features": {
                "Sensors": "Face ID, accelerometer, gyro, proximity, compass, barometer | Ultra Wideband (UWB) support (gen2 chip)\nEmergency SOS, Messages and Find My via satellite"
            },
            "Battery": {
                "Type": "Li-Ion 4441 mAh",
                "Charging": "Wired, PD2.0, 50% in 30 min\n15W wireless (MagSafe)\n15W wireless (Qi2) - requires iOS 17.2 update\n4.5W reverse wired"
            },
            "Misc": {
                "Colors": "Black Titanium, White Titanium, Blue Titanium, Natural Titanium",
                "Models": "A2849, A3105, A3106, A3108, iPhone16,2",
                "SAR": "1.07 W/kg (head)     1.11 W/kg (body)",
                "SAR EU": "0.98 W/kg (head)     0.98 W/kg (body)",
                "Price": "$ 557.51 / € 655.00 / £ 551.75 / ₹ 154,900"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1487203 (v10)\nGeekBench: 7237 (v6.0)",
                "Display": "1787 nits max brightness (measured)",
                "Camera": "Photo / Video",
                "Loudspeaker": "-24.5 LUFS (Very good)",
                "Battery": "Active use score 16:01h",
                "Battery (old)": "Endurance rating 118h"
            }
        },
        "prices": [],
        "storeUrls": {}
    },
    {
        "id": "galaxy-s24",
        "brand": "Samsung",
        "model": "Galaxy S24",
        "imageUrl": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-5g-sm-s921.jpg",
        "releaseDate": "2024",
        "specifications": {
            "Network": {
                "Technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900 | CDMA 800 / 1900 & TD-SCDMA",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 | CDMA2000 1xEV-DO",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66 - International | 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 18, 19, 20, 25, 26, 28, 29, 30, 38, 39, 40, 41, 48, 66, 71 - USA",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6 - International | 1, 7, 25, 28, 41, 66, 71, 78, 257, 258, 260, 261 SA/NSA/Sub6/mmWave - USA",
                "Speed": "HSPA, LTE (CA), 5G"
            },
            "Launch": {
                "Announced": "2024, January 17",
                "Status": "Available. Released 2024, January 24"
            },
            "Body": {
                "Dimensions": "162.3 x 79 x 8.6 mm (6.39 x 3.11 x 0.34 in)",
                "Weight": "232 g or 233 g (8.18 oz)",
                "Build": "Glass front (Corning Gorilla Armor), glass back (Corning Gorilla Armor), titanium frame (grade 2)",
                "SIM": "· Nano-SIM + Nano-SIM + eSIM + eSIM (max 2 at a time) - INT· Nano-SIM + eSIM + eSIM (max 2 at a time) - USA· Nano-SIM + Nano-SIM - CN | IP68 dust tight and water resistant (immersible up to 1.5m for 30 min)\nStylus (Bluetooth integration, accelerometer, gyro)"
            },
            "Display": {
                "Type": "Dynamic AMOLED 2X, 120Hz, HDR10+, 2600 nits (peak)",
                "Size": "6.2 inches, 93.2 cm2 (~91.4% screen-to-body ratio)",
                "Resolution": "1080 x 2340 pixels, 19.5:9 ratio (~418 ppi density)",
                "Protection": "Corning Gorilla Armor",
                "Ekran Boyutu": "6.2 İnç",
                "Ekran Teknolojisi": "Dynamic AMOLED",
                "Ekran Çözünürlüğü": "1080x2340 (FHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "FHD+",
                "Piksel Yoğunluğu": "418 PPI",
                "Ekran Yenileme Hızı": "120 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "93.2 cm²",
                "Ekran Özellikleri": "HDR, HDR10+, LTPO, DCI-P3 Renk Uzayı, Çerçevesiz Tasarım, Ekran İçinde Ön Kamera, Sürekli Açık Ekran (Always-on Display), 2600 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Gorilla Armor",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "91.4%"
            },
            "Platform": {
                "OS": "Android 14, up to 7 major Android upgrades, One UI 8.0",
                "Chipset": "Qualcomm SM8650-AC Snapdragon 8 Gen 3 (4 nm)",
                "CPU": "8-core (1x3.39GHz Cortex-X4 & 3x3.1GHz Cortex-A720 & 2x2.9GHz Cortex-A720 & 2x2.2GHz Cortex-A520)",
                "GPU": "Adreno 750 (1 GHz)"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM | UFS 4.0"
            },
            "Main Camera": {
                "Quad": "200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6µm, multi-directional PDAF, OIS\n10 MP, f/2.4, 67mm (telephoto), 1/3.52\", 1.12µm, PDAF, OIS, 3x optical zoom\n50 MP, f/3.4, 111mm (periscope telephoto), 1/2.52\", 0.7µm, PDAF, OIS, 5x optical zoom\n12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4µm, dual pixel PDAF, Super Steady video",
                "Features": "Laser AF, LED flash, auto-HDR, panorama",
                "Video": "8K@24/30fps, 4K@30/60/120fps, 1080p@30/60/120/240fps, HDR10+, stereo sound rec., gyro-EIS"
            },
            "Selfie camera": {
                "Single": "12 MP, f/2.2, 26mm (wide), 1/3.2\", 1.12µm, dual pixel PDAF",
                "Features": "HDR, HDR10+",
                "Video": "4K@30/60fps, 1080p@30fps"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No | High-bitrate audio support"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS, GLONASS, BDS, GALILEO, QZSS",
                "NFC": "Yes",
                "Radio": "No",
                "USB": "USB Type-C 3.2, DisplayPort 1.2, OTG"
            },
            "Features": {
                "Sensors": "Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer | Samsung DeX, Samsung Wireless DeX (desktop experience support)\nUltra Wideband (UWB) support"
            },
            "Battery": {
                "Type": "Li-Ion 5000 mAh",
                "Charging": "45W wired, PD3.0, 65% in 30 min\n15W wireless (Qi)\n4.5W reverse wireless"
            },
            "Misc": {
                "Colors": "Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow, Titanium Blue, Titanium Green, Titanium Orange",
                "Models": "SM-S928B, SM-S928B/DS, SM-S928U, SM-S928U1, SM-S928W, SM-S928N, SM-S9280, SM-S928E, SM-S928E/DS",
                "SAR": "1.26 W/kg (head)     0.62 W/kg (body)",
                "SAR EU": "1.06 W/kg (head)     1.30 W/kg (body)",
                "Price": "$ 649.95 / € 648.13 / £ 466.00"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1453497 (v9), 1823822 \n(v10)\nGeekBench: 7076 (v6)\n3DMark: 4983 (Wild Life Extreme)",
                "Display": "1447 nits max brightness (measured)",
                "Camera": "Photo / Video",
                "Loudspeaker": "-24.6 LUFS (Very good)",
                "Battery": "Active use score 13:49h"
            }
        },
        "prices": [
            {
                "store": "Amazon",
                "price": 39999,
                "currency": "₺",
                "url": "https://www.amazon.com.tr/Samsung-Galaxy-S24-128-GB/dp/B0CNKGPSBK",
                "updatedAt": "2024-02-01T10:00:00Z"
            },
            {
                "store": "Hepsiburada",
                "price": 38999,
                "currency": "₺",
                "url": "https://www.hepsiburada.com/samsung-galaxy-s24-128-gb-8-gb-ram-samsung-turkiye-garantili-p-HBCV00005MLL3K",
                "updatedAt": "2024-02-01T10:05:00Z"
            },
            {
                "store": "Trendyol",
                "price": 40500,
                "currency": "₺",
                "url": "https://www.trendyol.com/samsung/galaxy-s24-8-gb-ram-128-gb-oniks-siyah-p-792557550",
                "updatedAt": "2024-02-01T09:30:00Z"
            }
        ],
        "storeUrls": {
            "amazon": "https://www.amazon.com.tr/Samsung-Galaxy-S24-128-GB/dp/B0CNKGPSBK",
            "trendyol": "https://www.trendyol.com/samsung/galaxy-s24-8-gb-ram-128-gb-oniks-siyah-p-792557550",
            "hepsiburada": "https://www.hepsiburada.com/samsung-galaxy-s24-128-gb-8-gb-ram-samsung-turkiye-garantili-p-HBCV00005MLL3K"
        }
    },
    {
        "id": "galaxy-s24-plus",
        "brand": "Samsung",
        "model": "Galaxy S24+",
        "imageUrl": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-plus-5g-sm-s926.jpg",
        "releaseDate": "2024",
        "specifications": {
            "Network": {
                "Technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900 | CDMA 800 / 1900 & TD-SCDMA",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 | CDMA2000 1xEV-DO",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66 - International | 1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 18, 19, 20, 25, 26, 28, 29, 30, 38, 39, 40, 41, 48, 66, 71 - USA",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6 - International | 1, 7, 25, 28, 41, 66, 71, 78, 257, 258, 260, 261 SA/NSA/Sub6/mmWave - USA",
                "Speed": "HSPA, LTE (CA), 5G"
            },
            "Launch": {
                "Announced": "2024, January 17",
                "Status": "Available. Released 2024, January 24"
            },
            "Body": {
                "Dimensions": "158.5 x 75.9 x 7.7 mm (6.24 x 2.99 x 0.30 in)",
                "Weight": "196 g or 197 g (6.91 oz)",
                "Build": "Glass front (Gorilla Glass Victus 2), glass back (Gorilla Glass Victus 2), aluminum frame",
                "SIM": "· Nano-SIM + Nano-SIM + eSIM + eSIM (max 2 at a time) - INT· Nano-SIM + eSIM + eSIM (max 2 at a time) - USA· Nano-SIM + Nano-SIM - CN | IP68 dust tight and water resistant (immersible up to 1.5m for 30 min)\nArmor aluminum 2 frame"
            },
            "Display": {
                "Type": "Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits (peak)",
                "Size": "6.7 inches, 110.2 cm2 (~91.6% screen-to-body ratio)",
                "Resolution": "1440 x 3120 pixels, 19.5:9 ratio (~513 ppi density)",
                "Protection": "Corning Gorilla Glass Victus 2",
                "Ekran Boyutu": "6.7 İnç",
                "Ekran Teknolojisi": "Dynamic AMOLED",
                "Ekran Çözünürlüğü": "1440x3120 (QHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "QHD+",
                "Piksel Yoğunluğu": "513 PPI",
                "Ekran Yenileme Hızı": "120 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "110.2 cm²",
                "Ekran Özellikleri": "HDR, HDR10+, LTPO, DCI-P3 Renk Uzayı, Çerçevesiz Tasarım, Ekran İçinde Ön Kamera, Sürekli Açık Ekran (Always-on Display), 2600 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Gorilla Glass Victus 2",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "91.46%"
            },
            "Platform": {
                "OS": "Android 14, up to 7 major Android upgrades, One UI 8.0",
                "Chipset": "Qualcomm SM8650-AC Snapdragon 8 Gen 3 (4 nm) - USA/Canada/ChinaExynos 2400 (4 nm) - International",
                "CPU": "8-core (1x3.39GHz Cortex-X4 & 3x3.1GHz Cortex-A720 & 2x2.9GHz Cortex-A720 & 2x2.2GHz Cortex-A520)10-core (1x3.2GHz Cortex-X4 & 2x2.9GHz Cortex-A720 & 3x2.6GHz Cortex-A720 & 4x1.95GHz Cortex-A520)",
                "GPU": "Adreno 750 (1 GHz) - USA/Canada/ChinaXclipse 940 - International"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "256GB 12GB RAM, 512GB 12GB RAM | UFS 4.0"
            },
            "Main Camera": {
                "Triple": "50 MP, f/1.8, 24mm (wide), 1/1.56\", 1.0µm, dual pixel PDAF, OIS\n10 MP, f/2.4, 67mm (telephoto), 1/3.94\", 1.0µm, PDAF, OIS, 3x optical zoom\n12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\" 1.4µm, Super Steady video",
                "Features": "LED flash, auto-HDR, panorama",
                "Video": "8K@24/30fps, 4K@30/60fps, 1080p@30/60/120/240fps, HDR10+, stereo sound rec., gyro-EIS"
            },
            "Selfie camera": {
                "Single": "12 MP, f/2.2, 26mm (wide), 1/3.2\", 1.12µm, dual pixel PDAF",
                "Features": "HDR, HDR10+",
                "Video": "4K@30/60fps, 1080p@30fps"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No | High-bitrate audio support"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS, GLONASS, BDS, GALILEO, QZSS",
                "NFC": "Yes",
                "Radio": "No",
                "USB": "USB Type-C 3.2, DisplayPort 1.2, OTG"
            },
            "Features": {
                "Sensors": "Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer | Samsung DeX, Samsung Wireless DeX (desktop experience support)\nUltra Wideband (UWB) support"
            },
            "Battery": {
                "Type": "Li-Ion 4900 mAh",
                "Charging": "45W wired, PD3.0, 65% in 30 min\n15W wireless (Qi)\n4.5W reverse wireless"
            },
            "Misc": {
                "Colors": "Onyx Black, Marble Grey, Cobalt Violet, Amber Yellow, Jade Green, Sandstone Orange, Sapphire Blue",
                "Models": "SM-S926B, SM-S926B/DS, SM-S926U, SM-S926U1, SM-S926W, SM-S926N, SM-S9260, SM-S926E, SM-S926E/DS",
                "SAR": "1.16 W/kg (head)     0.84 W/kg (body)",
                "SAR EU": "0.74 W/kg (head)     1.25 W/kg (body)",
                "Price": "$ 434.00 / € 511.60 / £ 428.00"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1290977 (v9), 1774819 \n(v10)\nGeekBench: 5987 (v5), 6926 (v6)\n3DMark: 4365 (Wild Life Extreme)",
                "Display": "1452 nits max brightness (measured)",
                "Camera": "Photo / Video",
                "Loudspeaker": "-25.0 LUFS (Very good)",
                "Battery": "Active use score 12:30h"
            }
        },
        "prices": [
            {
                "store": "Amazon",
                "price": 54999,
                "currency": "₺",
                "url": "https://www.amazon.com.tr/Samsung-Galaxy-S24-Plus-256/dp/B0CNKGPSBP",
                "updatedAt": "2024-02-01T10:00:00Z"
            },
            {
                "store": "Hepsiburada",
                "price": 53999,
                "currency": "₺",
                "url": "https://www.hepsiburada.com/samsung-galaxy-s24-plus-256-gb-12-gb-ram-samsung-turkiye-garantili-p-HBCV00005MLL3L",
                "updatedAt": "2024-02-01T10:05:00Z"
            },
            {
                "store": "Trendyol",
                "price": 55500,
                "currency": "₺",
                "url": "https://www.trendyol.com/samsung/galaxy-s24-plus-12-gb-ram-256-gb-oniks-siyah-p-792557570",
                "updatedAt": "2024-02-01T09:30:00Z"
            }
        ],
        "storeUrls": {
            "amazon": "https://www.amazon.com.tr/Samsung-Galaxy-S24-Plus-256/dp/B0CNKGPSBP",
            "trendyol": "https://www.trendyol.com/samsung/galaxy-s24-plus-12-gb-ram-256-gb-oniks-siyah-p-792557570",
            "hepsiburada": "https://www.hepsiburada.com/samsung-galaxy-s24-plus-256-gb-12-gb-ram-samsung-turkiye-garantili-p-HBCV00005MLL3L"
        }
    },
    {
        "id": "galaxy-s24-fe",
        "brand": "Samsung",
        "model": "Galaxy S24 FE",
        "imageUrl": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-fe-r1.jpg",
        "releaseDate": "2024",
        "specifications": {
            "Network": {
                "Technology": "GSM / HSPA / LTE / 5G",
                "2G bands": "GSM 850 / 900 / 1800 / 1900",
                "3G bands": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
                "4G bands": "1, 2, 3, 4, 5, 7, 8, 12, 17, 18, 19, 20, 25, 26, 28, 32, 38, 40, 41, 66 - International",
                "5G bands": "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6 - International",
                "Speed": "HSPA, LTE, 5G"
            },
            "Launch": {
                "Announced": "2024, September 26",
                "Status": "Available. Released 2024, October 03"
            },
            "Body": {
                "Dimensions": "162 x 77.3 x 8 mm (6.38 x 3.04 x 0.31 in)",
                "Weight": "213 g (7.51 oz)",
                "Build": "Glass front (Gorilla Glass Victus+), glass back (Gorilla Glass Victus+), aluminum frame",
                "SIM": "· Nano-SIM· Nano-SIM + Nano-SIM· Nano-SIM + eSIM· eSIM + eSIM | IP68 dust tight and water resistant (immersible up to 1.5m for 30 min)"
            },
            "Display": {
                "Type": "Dynamic AMOLED 2X, 120Hz, HDR10+, 1900 nits (peak)",
                "Size": "6.7 inches, 110.2 cm2 (~88.0% screen-to-body ratio)",
                "Resolution": "1080 x 2340 pixels, 19.5:9 ratio (~385 ppi density)",
                "Protection": "Corning Gorilla Glass Victus+, Mohs level 5",
                "Ekran Boyutu": "6.7 İnç",
                "Ekran Teknolojisi": "Dynamic AMOLED 2X",
                "Ekran Çözünürlüğü": "1080x2340 (FHD+) Piksel",
                "Ekran Çözünürlüğü Standardı": "FHD+",
                "Piksel Yoğunluğu": "385 PPI",
                "Ekran Yenileme Hızı": "120 Hz",
                "Ekran Oranı": "19.5:9",
                "Ekran Alanı": "110.2 cm²",
                "Ekran Özellikleri": "HDR, HDR10+, DCI-P3 Renk Uzayı, Çerçevesiz Tasarım, Ekran İçinde Ön Kamera, Sürekli Açık Ekran (Always-on Display), 1900 cd/m² Parlaklık (Maks.)",
                "Ekran Dayanıklılığı": "Corning Gorilla Glass Victus+",
                "Renk Sayısı": "16 Milyon",
                "Ekran / Gövde Oranı": "88.0%"
            },
            "Platform": {
                "OS": "Android 14, up to 7 major Android upgrades, One UI 8.0",
                "Chipset": "Exynos 2400e (4 nm)",
                "CPU": "10-core (1x3.1 GHz + 2x2.9 GHz + 3x2.6 GHz + 4x1.95 GHz)",
                "GPU": "Xclipse 940"
            },
            "Memory": {
                "Card slot": "No",
                "Internal": "128GB 8GB RAM, 256GB 8GB RAM, 512GB 8GB RAM"
            },
            "Main Camera": {
                "Triple": "50 MP, f/1.8, 24mm (wide), 1/1.57\", 1.0µm, dual pixel PDAF, OIS\n8 MP, f/2.4, 75mm (telephoto), 1/4.4\", 1.0µm, PDAF, OIS, 3x optical zoom\n12 MP, f/2.2, 13mm, 123˚ (ultrawide), 1/3.0\", 1.12µm",
                "Features": "LED flash, HDR, panorama",
                "Video": "8K@30fps, 4K@30/60/120fps, 1080p@30/60/120/240fps"
            },
            "Selfie camera": {
                "Single": "10 MP, f/2.4, 26mm (wide), 1/3.0\", 1.22µm",
                "Video": "4K@30/60fps, 1080p@30/60fps; gyro-EIS"
            },
            "Sound": {
                "Loudspeaker": "Yes, with stereo speakers",
                "3.5mm jack": "No"
            },
            "Comms": {
                "WLAN": "Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band or tri-band (market/region dependent), Wi-Fi Direct",
                "Bluetooth": "5.3, A2DP, LE",
                "Positioning": "GPS, GLONASS, GALILEO, BDS",
                "NFC": "Yes",
                "Radio": "Unspecified",
                "USB": "USB Type-C 3.2, OTG"
            },
            "Features": {
                "Sensors": "Fingerprint (under display, optical), accelerometer, gyro, compass | Virtual proximity sensing\nSamsung DeX (desktop experience support)"
            },
            "Battery": {
                "Type": "4700 mAh",
                "Charging": "25W wired, PD, QC2, 50% in 30 min\n15W wireless\nReverse wireless"
            },
            "Misc": {
                "Colors": "Blue, Graphite, Gray, Mint, Yellow",
                "Models": "SM-S721B, SM-S721B/DS, SM-S721U1, SM-S721U, SM-S721W, SM-S7210, SM-S721N",
                "SAR": "0.94 W/kg (head)     0.71 W/kg (body)",
                "SAR EU": "0.86 W/kg (head)     1.29 W/kg (body)",
                "Price": "$ 244.44 / € 369.00 / £ 279.00 / ₹ 39,899"
            },
            "Our Tests": {
                "Performance": "AnTuTu: 1548896 (v10)\nGeekBench: 6299 (v6)\n3DMark: 3889 (Wild Life Extreme)",
                "Display": "1372 nits max brightness (measured)",
                "Loudspeaker": "-24.6 LUFS (Very good)",
                "Battery": "Active use score 11:48h"
            },
            "EU LABEL": {
                "Energy": "Class B",
                "Battery": "42:00h endurance, 2000 cycles",
                "Free fall": "Class A (270 falls)",
                "Repairability": "Class C"
            }
        },
        "prices": [
            {
                "store": "Amazon",
                "price": 29999,
                "currency": "₺",
                "url": "https://www.amazon.com.tr/Samsung-Galaxy-S24-FE-128/dp/B0DGX5R1YK",
                "updatedAt": "2024-10-15T10:00:00Z"
            },
            {
                "store": "Hepsiburada",
                "price": 28999,
                "currency": "₺",
                "url": "https://www.hepsiburada.com/samsung-galaxy-s24-fe-128-gb-8-gb-ram-samsung-turkiye-garantili-p-HBCV00006ABC12",
                "updatedAt": "2024-10-15T10:05:00Z"
            },
            {
                "store": "Trendyol",
                "price": 30500,
                "currency": "₺",
                "url": "https://www.trendyol.com/samsung/galaxy-s24-fe-8-gb-ram-128-gb-grafit-p-820000001",
                "updatedAt": "2024-10-15T09:30:00Z"
            }
        ],
        "storeUrls": {
            "amazon": "https://www.amazon.com.tr/Samsung-Galaxy-S24-FE-128/dp/B0DGX5R1YK",
            "trendyol": "https://www.trendyol.com/samsung/galaxy-s24-fe-8-gb-ram-128-gb-grafit-p-820000001",
            "hepsiburada": "https://www.hepsiburada.com/samsung-galaxy-s24-fe-128-gb-8-gb-ram-samsung-turkiye-garantili-p-HBCV00006ABC12"
        }
    }
];

export const getLowestPrice = (prices: PriceInfo[]) => {
    if (!prices || prices.length === 0) return null;
    return prices.reduce((min, p) => p.price < min.price ? p : min, prices[0]);
};