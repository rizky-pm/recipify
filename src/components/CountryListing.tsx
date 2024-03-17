import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import MaxWidthWrapper from './MaxWidthWrapper';
import TypographyH2 from './TypographyH2';
import TypographyH3 from './TypographyH3';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { COUNTRIES } from '@/constants';
import { fetchData } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { CountryTypes } from '@/types';

interface CountryCardProps {
  country: CountryTypes;
  navigate: (path: string) => void;
}

const CountryListing = () => {
  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ['country-list'],
    queryFn: () => fetchData(`/filter.php?a=list`),
  });

  if (isLoading) {
    return (
      <MaxWidthWrapper className='mt-4 flex flex-col'>
        <Skeleton className='h-8 sm:h-11 w-1/3 mb-4' />
        <Skeleton className='h-60 sm:h-72 w-full rounded' />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className='my-4'>
      <TypographyH3 className='mb-4 sm:hidden'>Countries</TypographyH3>
      <TypographyH2 className='mb-4 hidden sm:block'>Countries</TypographyH2>

      <ScrollArea className='w-full whitespace-nowrap rounded-md bg-primary/75 card-shadow'>
        <div className='flex w-max space-x-4 sm:space-x-6 px-4 sm:px-6 py-6 sm:py-8'>
          <div className='w-44 sm:w-52 flex flex-col justify-center rounded'>
            <p className='whitespace-normal text-3xl sm:text-4xl font-bold text-background'>
              Discover recipes from around the globe
            </p>
          </div>
          {COUNTRIES.map((country) => (
            <CountryCard
              key={country.strArea}
              country={country}
              navigate={navigate}
            />
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </MaxWidthWrapper>
  );
};

const CountryCard = ({ country, navigate }: CountryCardProps) => (
  <figure
    className='shrink-0 p-4 sm:p-6 rounded bg-background cursor-pointer'
    onClick={() => navigate(`country/${country.strArea}`)}
  >
    <div className='overflow-hidden rounded-md'>
      <img
        src={country.flag}
        alt={`Photo of ${country.strArea} flag`}
        className='w-44 h-32 sm:w-48 sm:h-36'
      />
    </div>
    <figcaption className='pt-2 text-base text-muted-foreground'>
      <span className='font-semibold text-foreground sm:text-2xl'>
        {country.strArea}
      </span>
    </figcaption>
  </figure>
);

export default CountryListing;
