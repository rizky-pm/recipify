import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const TypographyH4 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children}
    </h4>
  );
};

export default TypographyH4;
