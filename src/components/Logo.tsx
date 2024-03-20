import React from 'react';

const Logo = () => {
  return (
    <div className='relative self-center sm:self-start'>
      <h1 className='text-6xl sm:text-8xl font-bold tracking-widest text-primary uppercase text-wrap'>
        Recipify
      </h1>
      <h1 className='z-10 absolute -top-1 -left-1 text-6xl sm:text-8xl font-bold tracking-widest text-muted uppercase text-wrap'>
        Recipify
      </h1>
    </div>
  );
};

export default Logo;
