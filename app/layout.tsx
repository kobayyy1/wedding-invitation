import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import MusicPlayer from '../src/components/audio/MusicPlayer';
const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'The Wedding of Silvia Wulandari & Riyandi Wahyudi',
  description: 'Minggu, 20 September 2026 - Doa Restu & Kehadiran Anda merupakan kehormatan dan kebahagiaan bagi kami.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'The Wedding of Silvia Wulandari & Riyandi Wahyudi',
    description: 'Minggu, 20 September 2026 - Doa Restu & Kehadiran Anda merupakan kehormatan bagi kami.',
    url: 'https://weddingsw.site',
    siteName: 'Silvia & Riyandi Wedding',
    images: [
      {
        url: 'https://weddingsw.site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silvia & Riyandi Wedding Invitation',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#070D19',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="bg-[#03060C] text-gray-200 antialiased font-sans selection:bg-amber-500/30 selection:text-amber-200">
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-transparent" />

        {/* Konten Halaman */}
        {children}

        {/* Pemutar musik global membungkus seluruh halaman */}
        <MusicPlayer />
      </body>
    </html>
  );
}