import { useState, useEffect, useCallback, useMemo } from 'react';
import { scroller, Element } from 'react-scroll';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

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
import { fetchData } from '@/lib/utils';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [mealsData, setMealsData] = useState<MealTypes[]>([]);
  const [randomMealsData, setRandomMealsData] = useState<MealTypes[]>([]);
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery({ maxWidth: 640 });

  const {
    data: byNameData,
    refetch: byNameRefetch,
    isSuccess: byNameIsSuccess,
    isLoading: byNameIsLoading,
  } = useQuery({
    queryKey: ['meal-by-name'],
    queryFn: () => fetchData(`/search.php?s=${search}`),
    enabled: false,
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

  const scrollToResult = () => {
    scroller.scrollTo('search-result', {
      duration: 1000,
      smooth: true,
    });
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      byNameRefetch();
      byIngredientRefetch();
    }
  };

  const handleClick = useCallback(
    (mealId: string) => {
      navigate(`/meal/${mealId}`);
    },
    [navigate]
  );

  const mergeMealData = useMemo(() => {
    return (data1: MealTypes[], data2: MealTypes[]) => {
      const uniqueIds: Record<string, boolean> = {};
      const mergedData = [...data1, ...data2].filter(({ idMeal }) => {
        if (!uniqueIds[idMeal]) {
          uniqueIds[idMeal] = true;
          return true;
        }
        return false;
      });
      return mergedData;
    };
  }, []);

  useEffect(() => {
    if (byNameData && byIngredientData) {
      const meals = mergeMealData(byNameData.meals, byIngredientData.meals);
      setMealsData(meals);
      if (byNameIsSuccess && byIngredientIsSuccess) {
        scrollToResult();
      }
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
          <MaxWidthWrapper className='text-center'>
            <div>
              <h1 className='text-6xl sm:text-7xl font-bold tracking-widest text-background text-center uppercase text-wrap'>
                Recipify
              </h1>
            </div>
            <div className='flex items-center gap-2 mt-8 sm:justify-center'>
              <Input
                type='text'
                placeholder='Search by ingredient or name'
                className='rounded-full text-center sm:w-4/5 sm:h-14 sm:text-lg'
                onChange={handleChange}
                onKeyDown={handleSearch}
                disabled={byNameIsLoading && byIngredientIsLoading}
              />
            </div>
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
                        <Badge className='px-4 py-1 text-base bg-primary/75'>
                          {meal.strArea}
                        </Badge>
                        <Badge className='px-4 py-1 text-base bg-primary/75'>
                          {meal.strCategory}
                        </Badge>
                        {meal.strTags
                          ?.split(',')
                          .filter(Boolean)
                          .map((tag: string) => (
                            <Badge
                              className='px-4 py-1 text-base bg-primary/75'
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

        {byNameData && byIngredientData && (
          <Element name='search-result'>
            <RecipeListing meals={mealsData} search={search} />
          </Element>
        )}
      </div>
    </>
  );
};

export default Home;
