import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BackButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={cn(
        'rounded-full hover:bg-accent transition-all w-12 h-12 cursor-pointer',
        className
      )}
      onClick={handleBack}
    >
      <ChevronLeft className='w-10 h-10 lg:w-12 lg:h-12' />
    </div>
  );
};

export default BackButton;
