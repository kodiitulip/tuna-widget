'use client';

import { useInterval } from '@/hooks/use-interval';
import { useWindowDimensions } from '@/hooks/use-window-dimentions';
import { cn, formatMsToMinutes } from '@/lib/utils';
import { PauseIcon, PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NoSong } from './loading';
import QRCode from 'react-qr-code';

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

const Home = () => {
  const params = useSearchParams();
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
  const [isRight] = useState<boolean>(() => (params.get('side') ?? 'left') === 'right');
  const [qrCode] = useState<boolean>(() => params.get('qrcode') !== null);
  const [songTitle, setSongTitle] = useState<string>('');
  const [songArtists, setSongArtists] = useState<string[]>(['']);
  const [songCoverArt, setSongCoverArt] = useState<string>('');
  const [songProgress, setSongProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isDown, setIsDown] = useState<boolean>(false);
  const { width } = useWindowDimensions();

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

  const Icon = isPaused ? PauseIcon : PlayIcon;

  useEffect(() => {
    const load = () => {
      // const side = params.get('side') ?? 'left';
      // setIsRight(side === 'right');
      const data = musicData;
      if (!data) return;
      setSongTitle(data.title ?? data.alternativeTitle ?? '');
      setSongArtists(data.artists ?? []);
      setIsPaused(data.status !== 'playing');
      setSongCoverArt(data.cover_path);
      setSongProgress(((data.progress ?? 1) / (data.duration ?? 1)) * 100);
    };
    load();
  }, [params, musicData, width]);

  if (isDown) notFound();
  if (musicData.status === 'unknown') return <NoSong />;

  return (
    <div className='flex gap-4'>
      {songCoverArt && (
        <Image
          src={songCoverArt}
          alt=''
          className={cn('object-cover object-center', isRight && 'order-3')}
          loading='eager'
          width={72}
          height={72}
        />
      )}
      <div className={cn('inline-flex flex-1 flex-col justify-between overflow-hidden', isRight && 'order-2')}>
        <ScrollingSongTitle
          songTitle={songTitle}
          windowWidth={width}
        />
        <p className='text-plate-subtle line-clamp-1 w-min text-sm whitespace-nowrap'>{songArtists}</p>
        <div className='text-theme-love flex items-center'>
          <Icon
            size={16}
            className='mr-2'
          />
          <div className='bg-plate-overlay h-1 flex-1'>
            <div
              className='h-1 bg-current'
              style={{ width: `${songProgress}%` }}
            />
          </div>
          <p className='mx-2 text-sm'>
            {formatMsToMinutes(musicData?.progress ?? 0)} / {formatMsToMinutes(musicData?.duration ?? 0)}
          </p>
        </div>
      </div>
      {qrCode && musicData.url && (
        <div className={cn('border-theme-love flex size-18 items-center justify-center border', isRight && 'order-1')}>
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

export default Home;
