'use client';

import { cn } from '@/lib/utils';
import { LoaderIcon, QrCodeIcon, RotateCwIcon, XIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Loading = () => (
  <div className='text-theme-love flex justify-between gap-4'>
    <div className='relative size-18'>
      <LoaderIcon
        size={30}
        className='absolute top-1/2 left-1/2 -translate-1/2 animate-spin'
      />
    </div>
    <div className='inline-flex flex-1 flex-col overflow-hidden'>
      <div className='flex-1'></div>
      <div className='flex items-center'>
        <RotateCwIcon
          size={16}
          className='mr-2'
        />
        <div className='bg-plate-overlay h-1 flex-1'></div>
        <p className='mx-2 text-sm'>--:-- / --:--</p>
      </div>
    </div>
  </div>
);

export const NoSong = () => {
  const params = useSearchParams();
  const [isRight] = useState<boolean>(() => (params.get('side') ?? 'left') === 'right');
  const [qrCode] = useState<boolean>(() => params.get('qrcode') !== null);
  return (
    <div className='text-theme-love flex justify-between gap-4'>
      <div className={cn('relative size-18', isRight && 'order-3')}>
        <i className='nf nf-md-robot_confused absolute top-1/2 left-1/2 -translate-1/2 text-4xl' />
      </div>
      <div className={cn('inline-flex flex-1 flex-col overflow-hidden', isRight && 'order-2')}>
        <div className='flex-1'>No Song</div>
        <div className='flex items-center'>
          <XIcon
            size={16}
            className='mr-2'
          />
          <div className='bg-plate-overlay h-1 flex-1'></div>
          <p className='mx-2 text-sm'>--:-- / --:--</p>
        </div>
      </div>
      {qrCode && (
        <div className={cn('flex size-18 items-center justify-center', isRight && 'order-1')}>
          <QrCodeIcon size={32} />
        </div>
      )}
    </div>
  );
};

export default Loading;
