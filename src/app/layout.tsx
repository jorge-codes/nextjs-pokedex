import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { StoreProvider } from '@/app/StoreProvider';
interface Props {
  readonly children: ReactNode;
}

// Configurations for shadcn/ui
import { cn } from '@/lib/utils';
const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Pokédex by @jorge_codes',
  description: 'Small pokédex project by Jorge Palacios @jorge_codes',
};

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang='en'>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>{children}</body>
      </html>
    </StoreProvider>
  );
}
