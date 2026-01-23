import { LoaderIcon } from 'lucide-react';

const Loading = () => (
  <div className='text-theme-love flex size-full flex-col justify-between'>
    <div className='relative flex-1'>
      <LoaderIcon
        size={30}
        className='absolute top-1/2 left-1/2 -translate-1/2 animate-spin'
      />
    </div>
    <div className='flex items-center'>
      <LoaderIcon
        size={16}
        className='mr-2 animate-spin'
      />
      <div className='bg-plate-overlay h-1 flex-1'></div>
      <p className='mx-2 text-sm'>--:-- / --:--</p>
    </div>
  </div>
);

export default Loading;
