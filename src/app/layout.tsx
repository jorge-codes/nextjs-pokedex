import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

// Configurations for shadcn/ui
import { cn } from '@/lib/utils';
const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Pokédex by @jorge_codes',
  description: 'Small pokédex project by Jorge Palacios @jorge_codes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>{children}</body>
    </html>
  );
}
