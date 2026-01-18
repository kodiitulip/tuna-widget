import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tuna Widget',
  description: '"Now PLaying" widget to use with the tuna-obs plugin'
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='en'>
    <body className='bg-plate-base size-full p-3 antialiased'>
      <div className='terminal-window border-theme-love m-0 size-full'>
        <p className='left-title text-theme-love'>playing</p>
        <Suspense>{children}</Suspense>
      </div>
    </body>
  </html>
);

export default RootLayout;
