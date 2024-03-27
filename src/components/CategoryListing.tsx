import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MaxWidthWrapper from './MaxWidthWrapper';
import { fetchData } from '@/lib/utils';
import TypographyH2 from './TypographyH2';
import TypographyH3 from './TypographyH3';
import { Skeleton } from './ui/skeleton';
import { CategoryTypes } from '@/types';

interface CategoryCardProps {
  category: CategoryTypes;
  navigate: (path: string) => void;
}

const CategoryListing = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['category-listing'],
    queryFn: () => fetchData('/categories.php'),
  });

  const memoizedNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const categoryCards = useMemo(() => {
    return data?.categories.map((category: CategoryTypes) => (
      <CategoryCard
        key={category.idCategory}
        category={category}
        navigate={memoizedNavigate}
      />
    ));
  }, [data?.categories, memoizedNavigate]);

  if (isLoading) {
    return (
      <MaxWidthWrapper className='mt-4 flex flex-col'>
        <Skeleton className='h-8 lg:h-11 w-1/3 mb-4' />
        <Skeleton className='h-60 lg:h-72 w-full rounded' />
      </MaxWidthWrapper>
    );
  }

  return data ? (
    <MaxWidthWrapper>
      <TypographyH3 className='mb-2 lg:hidden'>Categories</TypographyH3>
      <TypographyH2 className='mb-2 hidden lg:block'>Categories</TypographyH2>
      <ScrollArea className='w-full whitespace-nowrap rounded-md bg-background card-shadow'>
        <div className='flex w-max space-x-4 lg:space-x-6 px-4 lg:px-6 py-6 lg:py-8'>
          <div
            id='section'
            className='w-44 lg:w-52 flex flex-col justify-center rounded'
          >
            <p className='whitespace-normal text-3xl lg:text-4xl font-bold text-foreground'>
              Indulge in diverse culinary categories
            </p>
          </div>
          {categoryCards}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </MaxWidthWrapper>
  ) : null;
};

const CategoryCard = ({ category, navigate }: CategoryCardProps) => (
  <figure
    className='shrink-0 p-4 rounded-lg bg-background cursor-pointer border-2 border-border hover:border-primary transition-colors'
    onClick={() => navigate(`category/${category.strCategory}`)}
  >
    <div className='overflow-hidden rounded-md'>
      <img
        src={category.strCategoryThumb}
        alt={category.strCategoryDescription}
        className='w-44 h-32 lg:w-48 lg:h-36 bg-muted'
      />
    </div>
    <figcaption className='pt-2 text-base text-muted-foreground'>
      <span className='font-semibold text-foreground text-base lg:text-lg'>
        {category.strCategory}
      </span>
    </figcaption>
  </figure>
);

export default CategoryListing;
