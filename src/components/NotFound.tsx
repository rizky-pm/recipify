import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import TypographyH1 from './TypographyH1';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className='flex justify-center absolute top-1/3 w-full'>
      <div className='grid place-items-center'>
        <TypographyH1 className='text-center'>
          Whoops, meal not found.
        </TypographyH1>
        <Button
          variant={'default'}
          className='text-lg rounded-full mt-4'
          onClick={handleBackButton}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
