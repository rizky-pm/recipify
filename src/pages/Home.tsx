import { useState, useEffect } from 'react';
import { scroller, Element } from 'react-scroll';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import HeaderImage from '../assets/header-image.jpg';
import RecipeListing from '@/components/RecipeListing';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import CategoryListing from '@/components/CategoryListing';
import CountryListing from '@/components/CountryListing';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import TypographyH3 from '@/components/TypographyH3';
import { Skeleton } from '@/components/ui/skeleton';
import { Meal } from '@/types';
import { fetchData } from '@/lib/utils';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [mealsData, setMealsData] = useState<Meal[]>([]);
  const navigate = useNavigate();

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

  const { data: randomMeal, isLoading: randomMealIsLoading } = useQuery({
    queryKey: ['random-meal'],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      byNameRefetch();
      byIngredientRefetch();
    }
  };

  const handleClick = (mealId: string) => {
    navigate(`/meal/${mealId}`);
  };

  useEffect(() => {
    if (byNameData && byIngredientData) {
      const meals = mergeMealData(byNameData.meals, byIngredientData.meals);
      setMealsData(meals);
      if (byNameIsSuccess && byIngredientIsSuccess) {
        scrollToResult();
      }
    }
  }, [byNameData, byIngredientData]);

  // BOOKMARK : Remove same value of array of object
  const mergeMealData = (data1: Meal[], data2: Meal[]) => {
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

  return (
    <>
      <div className='relative h-screen w-full'>
        <img
          src={HeaderImage}
          alt='Dishes on the table'
          className='object-cover object-center h-full'
        />
        <div
          aria-hidden='true'
          className='bg-zinc-900/75 w-full h-full absolute top-0 left-0 flex'
        />
        <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full'>
          <MaxWidthWrapper className='text-center'>
            <div>
              <h1 className='text-6xl font-bold tracking-widest first:mt-0 text-background text-center uppercase text-wrap'>
                Recipify
              </h1>
            </div>
            <div className='flex items-center gap-2 mt-8'>
              <Input
                type='text'
                placeholder='Search by ingredient or name'
                className='rounded-full text-center'
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
          {randomMealIsLoading ? (
            <>
              <Skeleton className='h-8 w-[250px] mb-4' />
              <Skeleton className='h-96 w-full rounded-xl' />
            </>
          ) : randomMeal ? (
            <>
              <TypographyH3 className='mb-4'>Our Pick</TypographyH3>
              <Card
                key={randomMeal.meals[0].idMeal}
                onClick={() => handleClick(randomMeal.meals[0].idMeal)}
                className='cursor-pointer card-shadow'
              >
                <CardContent className='p-0'>
                  <img
                    src={randomMeal.meals[0].strMealThumb}
                    alt={`Picture of ${randomMeal.meals[0].strMeal}`}
                    className='rounded-tl-md rounded-tr-md w-full h-full aspect-square'
                  />
                </CardContent>
                <CardFooter className='p-4'>
                  <CardTitle className='text-xl truncate'>
                    {randomMeal.meals[0].strMeal}
                  </CardTitle>
                </CardFooter>
              </Card>
            </>
          ) : null}
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
