import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

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

  const memoizedNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const countryCards = useMemo(() => {
    return COUNTRIES.map((country) => (
      <CountryCard
        key={country.strArea}
        country={country}
        navigate={memoizedNavigate}
      />
    ));
  }, [COUNTRIES, memoizedNavigate]);

  if (isLoading) {
    return (
      <MaxWidthWrapper className='flex flex-col'>
        <Skeleton className='h-8 lg:h-11 w-1/3 mb-4' />
        <Skeleton className='h-60 lg:h-72 w-full rounded' />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <TypographyH3 className='mb-2 lg:hidden'>Countries</TypographyH3>
      <TypographyH2 className='mb-2 hidden lg:block'>Countries</TypographyH2>

      <ScrollArea className='w-full whitespace-nowrap rounded-md bg-primary/50 card-shadow'>
        <div className='flex w-max space-x-4 lg:space-x-6 px-4 lg:px-6 py-6 lg:py-8'>
          <div className='w-44 lg:w-52 flex flex-col justify-center rounded'>
            <p className='whitespace-normal text-3xl lg:text-4xl font-bold text-background'>
              Discover recipes from around the globe
            </p>
          </div>
          {countryCards}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </MaxWidthWrapper>
  );
};

const CountryCard = ({ country, navigate }: CountryCardProps) => (
  <figure
    className='shrink-0 p-4 lg:p-6 rounded bg-background cursor-pointer'
    onClick={() => navigate(`country/${country.strArea}`)}
  >
    <div className='overflow-hidden rounded-md'>
      <img
        src={country.flag}
        alt={`Photo of ${country.strArea} flag`}
        className='w-44 h-32 lg:w-48 lg:h-36'
      />
    </div>
    <figcaption className='pt-2 text-base text-muted-foreground'>
      <span className='font-semibold text-foreground text-xl lg:text-2xl'>
        {country.strArea}
      </span>
    </figcaption>
  </figure>
);

export default CountryListing;
