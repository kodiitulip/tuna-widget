'use client';

import { useState } from 'react';
import { SearchParams } from './page';
import { useInterval } from '@/hooks/use-interval';
import Image from 'next/image';
import { cn, formatMsToMinutes } from '@/lib/utils';
import { PauseIcon, PlayIcon, XIcon } from 'lucide-react';
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
  const noSong = musicData.status === 'unknown';
  const coverArt = musicData.cover_path;
  const Icon = noSong ? XIcon : musicData.status === 'stopped' ? PauseIcon : PlayIcon;
  const songProgress = (musicData.progress ?? 0) / (musicData.duration ?? 1);
  const songProgressString =
    formatMsToMinutes(musicData.progress ?? 0) + ' / ' + formatMsToMinutes(musicData.duration ?? 0);

  return (
    <main
      data-show={musicData.status === 'playing' || undefined}
      className='bg-plate-base not-data-show:animate-out data-show:animate-in fade-in slide-in-from-top-8 fade-out slide-out-to-top-8 fill-mode-forwards relative size-full max-h-30 p-3 duration-500'>
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
        <div
          className={cn('inline-flex flex-1 flex-col justify-between overflow-hidden', side === 'right' && 'order-2')}>
          <ScrollingSongTitle
            songTitle={noSong ? 'No Song' : (musicData.title ?? musicData.alternativeTitle ?? '')}
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
            <p className='mx-2 text-sm transition'>{songProgressString}</p>
          </div>
        </div>
        {qrcode && musicData.url && (
          <div className={cn('flex-centered size-18', side === 'right' && 'order-1')}>
            <QRCode
              value={musicData.url}
              className='size-16'
              width={72}
              height={72}
              bgColor='var(--color-theme-love)'
              fgColor='var(--color-plate-base)'
              aria-label='qrcode for the songs url'
            />
          </div>
        )}
      </div>
    </main>
  );
};

const ScrollingSongTitle = ({ songTitle, windowWidth }: { songTitle: string; windowWidth: number }) => {
  const shouldScroll = songTitle.length * 20 > windowWidth;
  return (
    <div className='inline-flex text-xl font-bold whitespace-nowrap'>
      <Title
        title={songTitle}
        scroll={shouldScroll}
      />
      {shouldScroll && (
        <Title
          title={songTitle}
          scroll={shouldScroll}
          ariaHidden
        />
      )}
    </div>
  );
};
const Title = ({ title, ariaHidden, scroll }: { title: string; ariaHidden?: boolean; scroll: boolean }) => (
  <h2
    className={cn('inline-flex', scroll && 'animate-scroll-text repeat-infinite ease-linear')}
    aria-hidden={ariaHidden}>
    {title}
    <div className='w-20' />
  </h2>
);
