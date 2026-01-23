'use client';

import { useState } from 'react';
import { SearchParams } from './page';
import { useInterval } from '@/hooks/use-interval';
import Image from 'next/image';
import { cn, formatMsToMinutes } from '@/lib/utils';
import { PauseIcon, PlayIcon, QrCodeIcon, XIcon } from 'lucide-react';
import { useWindowDimensions } from '@/hooks/use-window-dimentions';
import QRCode from 'react-qr-code';
import { notFound } from 'next/navigation';

type Props = {
  searchParams: SearchParams;
};
type MusicMetadata = {
  album?: string;
  album_url?: string;
  alternativeTitle?: string;
  artists?: string[];
  cover?: string;
  cover_path: string;
  cover_url: string;
  duration?: number;
  playback_date: string;
  playback_time: string;
  progress?: number;
  status: 'stopped' | 'playing' | 'unknown';
  status_id: 3 | 2 | 1;
  tags?: string[];
  title: string;
  url?: string;
  lyrics?: string;
};

export const MusicWidget = ({ searchParams }: Props) => {
  const { qrcode, side } = searchParams;
  const { width } = useWindowDimensions();
  const [isDown, setIsDown] = useState<boolean>(false);
  const [musicData, setMusicData] = useState<MusicMetadata>({
    cover_path: 'n/a',
    cover_url: 'http://localhost:1608/cover.png',
    lyrics: 'n/a',
    playback_date: '',
    playback_time: '',
    status: 'unknown',
    status_id: 3,
    title: '',
  });

  useInterval(async () => {
    const data = await fetch('http://localhost:1608/', { method: 'GET' })
      .then((res) => res.json())
      .catch((error) => {
        console.error('Error: ', error);
        console.log('Server Not Found');
        setIsDown(true);
      });
    setMusicData(data);
  }, 1000);

  if (isDown) notFound();
  if (musicData.status === 'unknown')
    return (
      <NoSong
        qrcode={qrcode}
        side={side}
      />
    );

  const coverArt = musicData.cover_path;
  const Icon = musicData.status === 'stopped' ? PauseIcon : PlayIcon;
  const songProgress = (musicData.progress ?? 0) / (musicData.duration ?? 1);

  return (
    <div className='terminal-window border-theme-love m-0 flex size-full gap-4'>
      <p className='left-title text-theme-love'>{musicData.status}</p>
      {coverArt && coverArt !== 'n/a' && (
        <Image
          src={coverArt}
          alt=''
          className={cn('object-cover object-center', side === 'right' && 'order-3')}
          loading='eager'
          width={72}
          height={72}
        />
      )}
      <div className={cn('inline-flex flex-1 flex-col justify-between overflow-hidden', side === 'right' && 'order-2')}>
        <ScrollingSongTitle
          songTitle={musicData.title ?? musicData.alternativeTitle ?? ''}
          windowWidth={width}
        />
        <p className='text-plate-subtle line-clamp-1 w-min text-sm whitespace-nowrap'>{musicData.artists ?? []}</p>
        <div className='text-theme-love flex items-center'>
          <Icon
            size={16}
            className='mr-2'
          />
          <div className='bg-plate-overlay h-1 flex-1'>
            <div
              className='h-1 bg-current'
              style={{ width: `${songProgress * 100}%` }}
            />
          </div>
          <p className='mx-2 text-sm'>
            {formatMsToMinutes(musicData?.progress ?? 0)} / {formatMsToMinutes(musicData?.duration ?? 0)}
          </p>
        </div>
      </div>
      {qrcode && musicData.url && (
        <div
          className={cn(
            'border-theme-love flex size-18 items-center justify-center border',
            side === 'right' && 'order-1'
          )}>
          <QRCode
            value={musicData.url}
            className='size-16'
            width={72}
            height={72}
            bgColor='var(--color-theme-love)'
            fgColor='var(--color-plate-base)'
          />
        </div>
      )}
    </div>
  );
};

const NoSong = ({ qrcode, side }: { qrcode?: boolean; side?: 'left' | 'right' }) => {
  return (
    <div className='text-theme-love flex justify-between gap-4'>
      <div className={cn('relative size-18', side === 'right' && 'order-3')}>
        <i className='nf nf-md-robot_confused absolute top-1/2 left-1/2 -translate-1/2 text-4xl' />
      </div>
      <div className={cn('inline-flex flex-1 flex-col overflow-hidden', side === 'right' && 'order-2')}>
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
      {qrcode && (
        <div className={cn('flex size-18 items-center justify-center', side === 'right' && 'order-1')}>
          <QrCodeIcon size={32} />
        </div>
      )}
    </div>
  );
};

const ScrollingSongTitle = ({ songTitle, windowWidth }: { songTitle: string; windowWidth: number }) => {
  const shouldScroll = songTitle.length * 20 > windowWidth;
  return (
    <h1
      className={cn(
        'inline-flex w-min text-xl font-bold whitespace-nowrap',
        shouldScroll && 'animate-scroll-half-text'
      )}>
      {songTitle}
      <div style={{ width: `${windowWidth / 5}px` }} />
      {shouldScroll && songTitle}
      <div style={{ width: `${windowWidth / 5}px` }} />
    </h1>
  );
};
