export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { mockPhones } from "../../../data/mockPhones";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";

interface PriceResult {
  store: string;
  price: number | null;
  currency: string;
  url: string;
  updatedAt: string;
}

async function fetchAmazonPrice(url: string): Promise<PriceResult> {
  try {
    const response = await fetch(
      `https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-lookup-product?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host":
            "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
        },
      },
    );
    if (!response.ok) throw new Error(`Amazon API error: ${response.status}`);
    const data = await response.json();
    // Axesso returns price as a number in "price" field
    const rawPrice = data?.price ?? data?.prices?.[0]?.price ?? null;
    const price =
      rawPrice !== null
        ? parseFloat(String(rawPrice).replace(/[^0-9.]/g, ""))
        : null;
    return {
      store: "Amazon",
      price,
      currency: "₺",
      url,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Amazon price fetch error:", err);
    return {
      store: "Amazon",
      price: null,
      currency: "₺",
      url,
      updatedAt: new Date().toISOString(),
    };
  }
}

async function fetchTrendyolPrice(url: string): Promise<PriceResult> {
  try {
    const response = await fetch(
      `https://trendyol-data-scraper.p.rapidapi.com/products?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "trendyol-data-scraper.p.rapidapi.com",
        },
      },
    );
    if (!response.ok) throw new Error(`Trendyol API error: ${response.status}`);
    const data = await response.json();
    // Letscrape Trendyol: price field is "price" or "salePrice"
    const rawPrice = data?.salePrice ?? data?.price ?? null;
    const price =
      rawPrice !== null
        ? parseFloat(String(rawPrice).replace(/[^0-9.]/g, ""))
        : null;
    return {
      store: "Trendyol",
      price,
      currency: "₺",
      url,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Trendyol price fetch error:", err);
    return {
      store: "Trendyol",
      price: null,
      currency: "₺",
      url,
      updatedAt: new Date().toISOString(),
    };
  }
}

async function fetchHepsiburadaPrice(url: string): Promise<PriceResult> {
  try {
    const response = await fetch(
      `https://hepsiburada-data.p.rapidapi.com/products?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "hepsiburada-data.p.rapidapi.com",
        },
      },
    );
    if (!response.ok)
      throw new Error(`Hepsiburada API error: ${response.status}`);
    const data = await response.json();
    // Letscrape Hepsiburada: "price" field
    const rawPrice = data?.price ?? null;
    const price =
      rawPrice !== null
        ? parseFloat(String(rawPrice).replace(/[^0-9.]/g, ""))
        : null;
    return {
      store: "Hepsiburada",
      price,
      currency: "₺",
      url,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Hepsiburada price fetch error:", err);
    return {
      store: "Hepsiburada",
      price: null,
      currency: "₺",
      url,
      updatedAt: new Date().toISOString(),
    };
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY === "YOUR_RAPIDAPI_KEY_HERE") {
    return NextResponse.json(
      { error: "RAPIDAPI_KEY is not configured. Please add it to .env.local" },
      { status: 503 },
    );
  }

  const { id } = await params;
  const phone = mockPhones.find((p) => p.id === id);
  if (!phone) {
    return NextResponse.json({ error: "Phone not found" }, { status: 404 });
  }

  const { storeUrls } = phone;
  const fetches: Promise<PriceResult>[] = [];

  if (storeUrls.amazon) fetches.push(fetchAmazonPrice(storeUrls.amazon));
  if (storeUrls.trendyol) fetches.push(fetchTrendyolPrice(storeUrls.trendyol));
  if (storeUrls.hepsiburada)
    fetches.push(fetchHepsiburadaPrice(storeUrls.hepsiburada));

  const results = await Promise.all(fetches);

  // Filter out nulls and sort by price ascending
  const validPrices = results.filter((r) => r.price !== null);
  validPrices.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

  return NextResponse.json(validPrices, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
    },
  });
}
