import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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

  if (isLoading) {
    return (
      <MaxWidthWrapper className='mt-4 flex flex-col'>
        <Skeleton className='h-8 sm:h-11 w-1/3 mb-4' />
        <Skeleton className='h-60 sm:h-72 w-full rounded' />
      </MaxWidthWrapper>
    );
  }

  return data ? (
    <MaxWidthWrapper className='mt-4'>
      <TypographyH3 className='mb-4 sm:hidden'>Categories</TypographyH3>
      <TypographyH2 className='mb-4 hidden sm:block'>Categories</TypographyH2>
      <ScrollArea className='w-full whitespace-nowrap rounded-md bg-primary/75 card-shadow'>
        <div className='flex w-max space-x-4 sm:space-x-6 px-4 sm:px-6 py-6 sm:py-8'>
          <div
            id='section'
            className='w-44 sm:w-52 flex flex-col justify-center rounded'
          >
            <p className='whitespace-normal text-3xl sm:text-4xl font-bold text-background'>
              Indulge in diverse culinary categories
            </p>
          </div>
          {data.categories.map((category: CategoryTypes) => (
            <CategoryCard
              key={category.idCategory}
              category={category}
              navigate={navigate}
            />
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </MaxWidthWrapper>
  ) : null;
};

const CategoryCard = ({ category, navigate }: CategoryCardProps) => (
  <figure
    className='shrink-0 p-4 sm:p-6 rounded bg-background cursor-pointer'
    onClick={() => navigate(`category/${category.strCategory}`)}
  >
    <div className='overflow-hidden rounded-md'>
      <img
        src={category.strCategoryThumb}
        alt={category.strCategoryDescription}
        className='w-44 h-32 sm:w-48 sm:h-36'
      />
    </div>
    <figcaption className='pt-2 text-base text-muted-foreground'>
      <span className='font-semibold text-foreground sm:text-2xl'>
        {category.strCategory}
      </span>
    </figcaption>
  </figure>
);

export default CategoryListing;
