import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MaxWidthWrapper from './MaxWidthWrapper';
import { fetchData } from '@/lib/utils';
import TypographyH3 from './TypographyH3';

const CategoryListing = () => {
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({
    queryKey: ['category-listing'],
    queryFn: () => fetchData('/categories.php'),
  });

  return isSuccess && data.categories ? (
    <MaxWidthWrapper className='px-4 mt-4'>
      <TypographyH3 className='mb-4'>Categories</TypographyH3>
      <ScrollArea className='w-96 whitespace-nowrap rounded-md border bg-primary/75'>
        <div className='flex w-max space-x-4 px-4 py-6'>
          <div
            id='section'
            className='w-44 flex flex-col justify-center rounded'
          >
            <p className='whitespace-normal text-3xl font-bold text-background'>
              Indulge in diverse culinary categories
            </p>
          </div>
          {data.categories.map((category) => (
            <figure
              key={category.idCategory}
              className='shrink-0 p-4 rounded bg-background'
              onClick={() => navigate(`category/${category.strCategory}`)}
            >
              <div className='overflow-hidden rounded-md'>
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategoryDescription}
                  className='w-44 h-32'
                />
              </div>
              <figcaption className='pt-2 text-base text-muted-foreground'>
                <span className='font-semibold text-foreground'>
                  {category.strCategory}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </MaxWidthWrapper>
  ) : (
    <h1>Loading ...</h1>
  );
};

export default CategoryListing;
