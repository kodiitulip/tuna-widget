import { CircleXIcon } from 'lucide-react';

const NotFound = () => (
  <div className='text-plate-muted absolute top-1/2 left-1/2 flex -translate-1/2 items-center gap-4'>
    <CircleXIcon size={40} />
    <span>
      No TunaOBS server found on{' '}
      <a
        href='http://localhost:1608'
        className='underline'>
        localhost:1608
      </a>
      !<br /> This site is meant to be used with Tuna and OBS!
    </span>
  </div>
);

export default NotFound;
