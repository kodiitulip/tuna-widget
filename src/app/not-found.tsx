const NotFound = () => (
  <main className='bg-plate-base relative size-full max-h-30 p-3'>
    <div className='terminal-window border-theme-love m-0 flex h-30 gap-4'>
      <h1 className='left-title text-theme-love'>not found</h1>
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
    </div>
  </main>
);

export default NotFound;
