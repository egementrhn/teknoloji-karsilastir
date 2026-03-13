import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';
import { CompareProvider } from './context/CompareContext';

export const metadata: Metadata = {
  title: 'Teknoloji Karşılaştır | Akıllı Telefon Özellikleri ve Fiyatları',
  description: 'En güncel akıllı telefonların teknik özelliklerini detaylı inceleyin ve e-ticaret sitelerindeki fiyatlarını karşılaştırın.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <CompareProvider>
            <Header />
            <main>{children}</main>
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

