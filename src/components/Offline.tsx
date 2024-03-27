import Logo from '@/components/Logo';
import TypographyH1 from '@/components/TypographyH1';

const Offline = () => {
  return (
    <div className='flex justify-center h-screen items-center w-full'>
      <div className='grid place-items-center'>
        <Logo />
        <TypographyH1 className='text-center'>
          Oops! It seems you're offline.
        </TypographyH1>
        <p className='text-muted-foreground mt-4'>
          You are currently offline. Please check your internet connection.
        </p>
      </div>
    </div>
  );
};

export default Offline;
