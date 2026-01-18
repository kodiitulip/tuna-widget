import { LoaderIcon, RotateCwIcon } from 'lucide-react';

const Loading = () => (
  <div className='flex'>
    <div className='relative size-18'>
      <LoaderIcon
        size={30}
        className='absolute top-1/2 left-1/2 -translate-1/2 animate-spin'
      />
    </div>
    <div className='inline-flex flex-1 flex-col overflow-hidden'>
      <h1 className='inline-flex w-min text-xl font-bold whitespace-nowrap'>...</h1>
      <p className='text-plate-subtle line-clamp-1 w-min text-sm whitespace-nowrap'>...</p>
      <div className='text-theme-love flex flex-1 items-center'>
        <RotateCwIcon
          size={16}
          className='mx-2'
        />
        <div className='bg-plate-overlay h-1 flex-1'></div>
        <p className='mx-2 text-sm'>--:-- / --:--</p>
      </div>
    </div>
  </div>
);

export default Loading;
