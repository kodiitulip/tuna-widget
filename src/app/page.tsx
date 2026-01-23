'use client';

import { Suspense } from 'react';
import Loading from './loading';
import { MusicWidget } from './widget';
import { useSearchParams } from 'next/navigation';

export type SearchParams = {
  side?: 'left' | 'right';
  qrcode?: boolean;
};

const Home = () => {
  const searchParams = useSearchParams();
  return (
    <Suspense fallback={<Loading />}>
      <MusicWidget
        searchParams={{
          qrcode: searchParams.get('qrcode') !== null,
          side: searchParams.get('side') as 'left' | 'right',
        }}
      />
    </Suspense>
  );
};

export default Home;
