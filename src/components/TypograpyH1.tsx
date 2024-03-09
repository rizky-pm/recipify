import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const TypograpyH1 = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default TypograpyH1;
