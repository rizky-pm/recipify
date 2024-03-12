import { Github, Linkedin, Mail } from 'lucide-react';
import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';

const Footer = () => {
  return (
    <footer className='py-6 bg-primary text-background text-center'>
      <MaxWidthWrapper className='flex flex-col space-y-4'>
        <div className='flex flex-wrap items-center justify-between flex-col space-y-4'>
          <div className='w-full'>
            <h2 className='text-lg font-semibold mb-1'>About</h2>
            <p className='text-sm'>
              Recipify is a culinary perosnal project powered by The Meal DB
              API, offering a diverse selection of recipes from around the
              world.
            </p>
          </div>
          <div className='w-full md:w-1/2'>
            <h2 className='text-lg font-semibold mb-1'>Contact Me</h2>

            <div className='flex space-x-4 justify-center'>
              <a
                href={'https://linkedin.com/in/rizky-p-mahendra/'}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex gap-1 items-center text-foreground hover:text-primary hover:bg-background w-12 h-12 justify-center rounded-full transition-all'
              >
                <Linkedin className='w-7 h-7 text-background group-hover:text-primary transition-all' />
              </a>

              <a
                href={'https://github.com/rizky-pm'}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex gap-1 items-center text-foreground hover:text-primary hover:bg-background w-12 h-12 justify-center rounded-full transition-all'
              >
                <Github className='w-7 h-7 text-background group-hover:text-primary transition-all' />
              </a>

              <a
                href={'mailto:rizkymahendra2346@gmail.com'}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex gap-1 items-center text-foreground hover:text-primary hover:bg-background w-12 h-12 justify-center rounded-full transition-all'
              >
                <Mail className='w-7 h-7 text-background group-hover:text-primary transition-all group-hover:background-red-500' />
              </a>
            </div>
          </div>

          <p className='text-sm'>© 2024 Recipify. All rights reserved.</p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
