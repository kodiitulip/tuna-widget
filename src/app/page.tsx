'use client';

import { useInterval } from '@/hooks/use-interval';
import { useWindowDimensions } from '@/hooks/use-window-dimentions';
import { cn, formatMsToMinutes } from '@/lib/utils';
import { PauseIcon, PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';

type MusicMetadata = {
  album: string;
  album_url: string;
  alternativeTitle: string;
  artists: string[];
  cover: string;
  cover_path: string;
  cover_url: string;
  duration: number;
  playback_date: string;
  playback_time: string;
  progress: number;
  status: 'stopped' | 'playing';
  status_id: number;
  tags: string[];
  title: string;
  url: string;
};

const Home = () => {
  const params = useSearchParams();
  const [musicData, setMusicData] = useState<MusicMetadata>();
  const [isRight, setIsRight] = useState<boolean>(false);
  const [animationPlayState, setAnimationPlayState] = useState<'paused' | 'running'>('paused');
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
      });
    setIsDown(!data || !data.title);
    setMusicData(data);
  }, 1000);

  const Icon = isPaused ? PauseIcon : PlayIcon;

  useEffect(() => {
    const load = () => {
      const side = params.get('side') ?? 'left';
      setIsRight(side === 'right');
      const data = musicData;
      if (!data) return;

      const title = data.title ?? data.alternativeTitle ?? '';

      if (title) setAnimationPlayState(title.length * 20 <= width ? 'paused' : 'running');

      setSongTitle(title);
      setSongArtists(data.artists);
      setIsPaused(data.status === 'stopped');
      setSongCoverArt(data.cover_path);
      setSongProgress((data.progress / data.duration) * 100);
    };
    load();
  }, [params, musicData, width]);

  if (isDown) notFound();
  if (!songTitle) return <Loading />;

  const titleElement = (
    <>
      {songTitle}
      {songTitle.length * 20 > width && (
        <>
          <div style={{ width: `${width / 5}px` }} />
          {songTitle}
          <div style={{ width: `${width / 5}px` }} />
        </>
      )}
    </>
  );

  return (
    <div className='flex gap-4'>
      {songCoverArt && (
        <Image
          src={songCoverArt}
          alt=''
          className={cn('object-cover object-center', isRight && 'order-2')}
          loading='eager'
          width={72}
          height={72}
        />
      )}
      <div className='inline-flex flex-1 flex-col justify-between overflow-hidden'>
        <h1
          className='animate-scroll-half-text inline-flex w-min text-xl font-bold whitespace-nowrap'
          style={{ animationPlayState, animationName: animationPlayState === 'paused' ? 'none' : undefined }}>
          {titleElement}
        </h1>
        <p className='text-plate-subtle line-clamp-1 w-min text-sm whitespace-nowrap'>{songArtists}</p>
        {songTitle && (
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
        )}
      </div>
    </div>
  );
};

export default Home;
