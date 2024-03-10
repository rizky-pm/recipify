import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const TypographyH2 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default TypographyH2;
