import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tuna Widget',
  description: '"Now PLaying" widget to use with the tuna-obs plugin',
  icons: [
    {
      url: '/tuna-widget/favicon.png',
    },
  ],
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='en'>
    <body className='bg-plate-base antialiased'>{children}</body>
  </html>
);

export default RootLayout;
