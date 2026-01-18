import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tuna Widget',
  description: '"Now PLaying" widget to use with the tuna-obs plugin'
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='en'>
    <body className='antialiased'>{children}</body>
  </html>
);

export default RootLayout;
