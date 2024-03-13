import { useQuery } from '@tanstack/react-query';

import MaxWidthWrapper from './MaxWidthWrapper';
import TypographyH3 from './TypographyH3';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { COUNTRIES } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

const CountryListing = () => {
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ['country-list'],
    queryFn: () => fetchData(`/filter.php?a=list`),
  });

  if (isLoading) {
    return (
      <MaxWidthWrapper className='mt-4 flex flex-col'>
        <Skeleton className='h-8 w-1/3 mb-4' />
        <Skeleton className='h-60 w-full rounded' />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className='my-4'>
      <TypographyH3 className='mb-4'>Countries</TypographyH3>

      <ScrollArea className='w-96 whitespace-nowrap rounded-md border bg-primary/75'>
        <div className='flex w-max space-x-4 px-4 py-6'>
          <div
            id='section'
            className='w-44 flex flex-col justify-center rounded'
          >
            <p className='whitespace-normal text-3xl font-bold text-background'>
              Discover recipes from around the globe
            </p>
          </div>
          {COUNTRIES.map((country) => (
            <figure
              key={country.strArea}
              className='shrink-0 p-4 rounded bg-background'
              onClick={() => navigate(`country/${country.strArea}`)}
            >
              <div className='overflow-hidden rounded-md'>
                <img
                  src={country.flag}
                  alt={`Photo of ${country.strArea} flag`}
                  className='w-44 h-32'
                />
              </div>
              <figcaption className='pt-2 text-base text-muted-foreground'>
                <span className='font-semibold text-foreground'>
                  {country.strArea}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </MaxWidthWrapper>
  );
};

export default CountryListing;
