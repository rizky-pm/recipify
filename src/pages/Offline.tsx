import Logo from '@/components/Logo';
import TypographyH1 from '@/components/TypographyH1';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Offline: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state.origin);

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate(state.origin);
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
        {isOnline ? (
          <Button
            variant={'default'}
            className='text-lg rounded-full mt-2'
            onClick={handleRetry}
            aria-label='Retry connection button'
          >
            Retry
          </Button>
        ) : (
          <p className='text-muted-foreground'>
            Please reconnect to the internet and try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Offline;
