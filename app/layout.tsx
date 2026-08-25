import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SoftHub Directory — Software Downloads & Tech News',
  description:
    'Download software for Windows, Mac, Linux, Android, and iOS. Browse thousands of apps, read reviews, and stay updated with the latest tech news.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
