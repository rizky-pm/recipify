import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const TypographyH3 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  );
};

export default TypographyH3;
