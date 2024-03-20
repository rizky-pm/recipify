import { useState, useEffect, useCallback, useMemo } from 'react';
import { scroller, Element } from 'react-scroll';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import HeaderImage from '../assets/header-image.jpg';
import RecipeListing from '@/components/RecipeListing';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import CategoryListing from '@/components/CategoryListing';
import CountryListing from '@/components/CountryListing';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import TypographyH3 from '@/components/TypographyH3';
import { Skeleton } from '@/components/ui/skeleton';
import TypographyH2 from '@/components/TypographyH2';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MealTypes } from '@/types';
import { cn, fetchData } from '@/lib/utils';
import {
  SearchTermValidator,
  TSearchTermValidator,
} from '@/lib/validators/search-validator';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [mealsData, setMealsData] = useState<MealTypes[]>([]);
  const [randomMealsData, setRandomMealsData] = useState<MealTypes[]>([]);
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery({ maxWidth: 640 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSearchTermValidator>({
    resolver: zodResolver(SearchTermValidator),
  });

  const {
    data: byNameData,
    refetch: byNameRefetch,
    isSuccess: byNameIsSuccess,
    isLoading: byNameIsLoading,
  } = useQuery({
    queryKey: ['meal-by-name'],
    queryFn: () => fetchData(`/search.php?s=${search}`),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    data: byIngredientData,
    refetch: byIngredientRefetch,
    isSuccess: byIngredientIsSuccess,
    isLoading: byIngredientIsLoading,
  } = useQuery({
    queryKey: ['meal-by-ingredient'],
    queryFn: () => fetchData(`/filter.php?i=${search}`),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: randomMealOne } = useQuery({
    queryKey: ['random-meal-one'],
    queryFn: () => fetchData('/random.php'),
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: randomMealTwo } = useQuery({
    queryKey: ['random-meal-two'],
    queryFn: () => fetchData('/random.php'),
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const isDoneFetching = useMemo(() => {
    return byNameIsSuccess && byIngredientIsSuccess;
  }, [byNameIsSuccess, byIngredientIsSuccess]);

  const scrollToResult = () => {
    scroller.scrollTo('search-result', {
      duration: 1000,
      smooth: true,
    });
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSearch = async () => {
    if (search !== '') {
      const res1 = await byNameRefetch();
      const res2 = await byIngredientRefetch();

      if (res1.status === 'success' && res2.status === 'success') {
        scrollToResult();
      }
    }
  };

  const handleClick = useCallback(
    (mealId: string) => {
      navigate(`/meal/${mealId}`);
    },
    [navigate]
  );

  const mergeMealData = useMemo(() => {
    return (data1: MealTypes[] | null, data2: MealTypes[] | null) => {
      if (!data1 && !data2) return [];

      const uniqueIds: Record<string, boolean> = {};

      const mergedData = [
        ...(data1 ?? []).filter(({ idMeal }) => {
          if (!uniqueIds[idMeal]) {
            uniqueIds[idMeal] = true;
            return true;
          }
          return false;
        }),
        ...(data2 ?? []).filter(({ idMeal }) => {
          if (!uniqueIds[idMeal]) {
            uniqueIds[idMeal] = true;
            return true;
          }
          return false;
        }),
      ];

      return mergedData;
    };
  }, []);

  useEffect(() => {
    if (byNameData && byIngredientData) {
      const meals = mergeMealData(byNameData.meals, byIngredientData.meals);
      setMealsData(meals);
      // scrollToResult();
    }
  }, [
    byNameData,
    byIngredientData,
    mergeMealData,
    byNameIsSuccess,
    byIngredientIsSuccess,
  ]);

  useEffect(() => {
    if (randomMealOne && randomMealTwo) {
      setRandomMealsData(
        mergeMealData(randomMealOne.meals, randomMealTwo.meals)
      );
    }
  }, [randomMealOne, randomMealTwo]);

  return (
    <>
      <div className='relative h-screen w-full'>
        <img
          src={HeaderImage}
          alt='Dishes on the table'
          className='object-cover h-full w-full'
        />
        <div
          aria-hidden='true'
          className='bg-zinc-900/75 w-full h-full absolute top-0 left-0 flex'
        />
        <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full'>
          <MaxWidthWrapper className='lg:max-w-screen-lg flex flex-col'>
            <div className='relative self-center sm:self-start'>
              <h1 className='text-6xl sm:text-8xl font-bold tracking-widest text-primary uppercase text-wrap'>
                Recipify
              </h1>
              <h1 className='z-10 absolute -top-1 -left-1 text-6xl sm:text-8xl font-bold tracking-widest text-background uppercase text-wrap'>
                Recipify
              </h1>
            </div>
            <form
              onSubmit={handleSubmit(handleSearch)}
              className='flex items-center gap-2 mt-8 sm:justify-center'
            >
              <div className='w-full grid grid-cols-10 grid-rows-2 gap-2 grid-areas-custom-layout'>
                <Input
                  {...register('search')}
                  type='text'
                  placeholder='Search by ingredient or name'
                  className={cn(
                    { 'focus-visible:ring-red-500': errors.search },
                    'rounded-full text-center sm:text-left sm:h-14 sm:px-8 transition-all grid-area-input col-span-8 sm:col-span-9 text-xs sm:text-lg'
                  )}
                  onChange={handleChange}
                  disabled={byNameIsLoading && byIngredientIsLoading}
                />
                <Button className='sm:h-14 grid-area-btn col-span-2 sm:col-span-1 rounded-full'>
                  <Search className='sm:w-8 sm:h-8' />
                </Button>
                {errors?.search && (
                  <p className='text-red-500 text-xs text-center sm:text-base sm:text-left sm:px-8 font-medium grid-area-error-msg col-span-8 sm:col-span-9'>
                    {errors.search.message}
                  </p>
                )}
              </div>
            </form>
          </MaxWidthWrapper>
        </div>
      </div>

      <div className='flex flex-col space-y-8 my-8'>
        <MaxWidthWrapper>
          {randomMealsData.length === 0 ? (
            <>
              <Skeleton className='h-8 w-[250px] mb-4' />
              <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <Skeleton className='h-72 w-full rounded-xl' />
                <Skeleton className='h-72 w-full rounded-xl' />
              </div>
            </>
          ) : (
            <>
              <TypographyH3 className='mb-4 lg:hidden'>Our Pick</TypographyH3>
              <TypographyH2 className='mb-4 hidden lg:block'>
                Our Pick
              </TypographyH2>

              <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12'>
                {randomMealsData?.map((meal: MealTypes) => (
                  <Card
                    key={meal.idMeal}
                    onClick={() =>
                      isMobileScreen ? handleClick(meal.idMeal) : null
                    }
                    className='cursor-pointer sm:cursor-default card-shadow sm:flex lg:w-2/4'
                  >
                    <CardContent className='p-0 h-72 sm:w-1/2'>
                      <img
                        src={meal.strMealThumb}
                        alt={`Picture of ${meal.strMeal}`}
                        className='rounded-tl-md rounded-tr-md sm:rounded-bl-md sm:rounded-tr-none w-full h-full aspect-square'
                      />
                    </CardContent>
                    <CardFooter className='p-4 sm:py-6 sm:w-1/2 sm:flex sm:flex-col sm:justify-center sm:items-start'>
                      <CardTitle className='text-xl sm:text-2xl truncate text-wrap max-h-28'>
                        {meal.strMeal}
                      </CardTitle>
                      <div className='hidden sm:flex sm:gap-2 sm:mt-4 sm:flex-wrap'>
                        <Badge className='px-4 py-1 text-base bg-primary/50'>
                          {meal.strArea}
                        </Badge>
                        <Badge className='px-4 py-1 text-base bg-primary/50'>
                          {meal.strCategory}
                        </Badge>
                        {meal.strTags
                          ?.split(',')
                          .filter(Boolean)
                          .map((tag: string) => (
                            <Badge
                              className='px-4 py-1 text-base bg-primary/50'
                              key={tag}
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                      <Button
                        onClick={() =>
                          !isMobileScreen ? handleClick(meal.idMeal) : null
                        }
                        className='self-end mt-auto text-base hidden sm:block'
                      >
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </MaxWidthWrapper>

        <CategoryListing />
        <CountryListing />

        <Element name='search-result'>
          <RecipeListing
            meals={mealsData}
            search={search}
            isDoneFetching={isDoneFetching}
          />
        </Element>
      </div>
    </>
  );
};

export default Home;
