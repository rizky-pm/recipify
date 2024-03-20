import { Github, Linkedin, Mail } from 'lucide-react';
import MaxWidthWrapper from './MaxWidthWrapper';

interface FooterLinkProps {
  href: string;
  icon: JSX.Element;
}

interface FooterProps {
  showFooter: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, icon }) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex gap-1 items-center text-foreground hover:text-primary hover:bg-background w-12 h-12 sm:w-16 sm:h-16 justify-center rounded-full transition-all'
    >
      {icon}
    </a>
  );
};

const Footer = ({ showFooter }: FooterProps) => {
  return showFooter ? (
    <footer className='py-6 sm:py-8 bg-primary text-background text-center lg:text-left mt-auto'>
      <MaxWidthWrapper className='flex flex-col space-y-4'>
        <div className='flex flex-wrap items-center justify-between flex-col lg:flex-row space-y-4 lg:items-baseline'>
          <div className='w-full lg:w-1/2'>
            <h2 className='text-lg sm:text-2xl font-semibold mb-1'>About</h2>
            <p className='text-sm sm:text-base'>
              Recipify is a culinary personal project powered by The Meal DB
              API, offering a diverse selection of recipes from around the
              world.
            </p>
          </div>
          <div className='w-full sm:w-1/2'>
            <h2 className='text-lg sm:text-2xl font-semibold mb-1 lg:text-right'>
              Contact
            </h2>

            <div className='flex space-x-2 justify-center lg:justify-end'>
              <FooterLink
                href={'https://linkedin.com/in/rizky-p-mahendra/'}
                icon={
                  <Linkedin className='w-7 h-7 sm:w-8 sm:h-8 text-background group-hover:text-primary transition-all' />
                }
              />
              <FooterLink
                href={'https://github.com/rizky-pm'}
                icon={
                  <Github className='w-7 h-7 sm:w-8 sm:h-8 text-background group-hover:text-primary transition-all' />
                }
              />
              <FooterLink
                href={'mailto:rizkymahendra2346@gmail.com'}
                icon={
                  <Mail className='w-7 h-7 sm:w-8 sm:h-8 text-background group-hover:text-primary transition-all group-hover:background-red-500' />
                }
              />
            </div>
          </div>

          <p className='text-sm sm:text-base'>
            © 2024 Recipify. All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  ) : null;
};

export default Footer;
