import { LoaderIcon, RotateCwIcon } from 'lucide-react';

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

export default Loading;
