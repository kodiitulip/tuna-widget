const NotFound = () => (
  <div className='text-plate-muted absolute top-1/2 left-1/2 flex -translate-1/2 items-center gap-4'>
    <i className='nf nf-md-robot_confused text-4xl' />
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
