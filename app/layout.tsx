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
  title: 'The Wedding of Silvia & Wahyudi',
  description: 'Undangan Pernikahan & Galeri Kenangan Digital',
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
        
        {children}

        {/* Pemutar musik ditaruh di sini agar abadi di semua rute */}
        <MusicPlayer />
      </body>
    </html>
  );
}