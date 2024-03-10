import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MaxWidthWrapper from './MaxWidthWrapper';
import { fetchData } from '@/lib/utils';
import TypographyH3 from './TypographyH3';

export interface Artwork {
  artist: string;
  art: string;
}

const CategoryListing = () => {
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({
    queryKey: ['category-listing'],
    queryFn: () => fetchData('/categories.php'),
  });

  return isSuccess && data.categories ? (
    <MaxWidthWrapper className='px-4 mt-4'>
      <TypographyH3>Categories</TypographyH3>
      <ScrollArea className='w-full whitespace-nowrap rounded-md border mt-2'>
        <div className='flex w-max space-x-4 p-4'>
          {data.categories.map((category) => (
            <figure
              key={category.idCategory}
              className='shrink-0 border-primary/75 border-2 rounded-md group hover:border-primary/100 transition-colors cursor-pointer'
              onClick={() => {
                navigate(`/category/${category.strCategory}`);
              }}
            >
              <div className='overflow-hidden rounded-md'>
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategoryDescription}
                  className='w-32 h-32 object-cover opacity-75 group hover:opacity-100 transition-all'
                />
              </div>
              <figcaption className='pt-2 bg-primary/75 px-4 group-hover:bg-primary/100 transition-colors'>
                <span className='font-semibold text-background'>
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
