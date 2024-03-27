import { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { useQuery } from '@tanstack/react-query';

import RecipeListing from '@/components/RecipeListing';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import CategoryListing from '@/components/CategoryListing';
import CountryListing from '@/components/CountryListing';
import { MealTypes } from '@/types';
import { fetchData, mergeMealData } from '@/lib/utils';
import RandomMeals from '@/components/RandomMeals';
import Header from '@/components/Header';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [mealsData, setMealsData] = useState<MealTypes[]>([]);

  const {
    data: byNameData,
    refetch: byNameRefetch,
    isSuccess: byNameIsSuccess,
    isLoading: byNameIsLoading,
    isRefetching: byNameIsRefetching,
    isError: byNameIsError,
    error: byNameError,
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
    isRefetching: byIngredientIsRefetching,
    isError: byIngredientIsError,
    error: byIngredientError,
  } = useQuery({
    queryKey: ['meal-by-ingredient'],
    queryFn: () => fetchData(`/filter.php?i=${search}`),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const isDoneFetching = byNameIsSuccess && byIngredientIsSuccess;

  const isSearching =
    byNameIsLoading ||
    byIngredientIsLoading ||
    byNameIsRefetching ||
    byIngredientIsRefetching;

  useEffect(() => {
    if (byNameData && byIngredientData) {
      const meals = mergeMealData(byNameData.meals, byIngredientData.meals);
      setMealsData(meals);
    }
  }, [byNameData, byIngredientData, byNameIsSuccess, byIngredientIsSuccess]);

  useEffect(() => {
    if (byNameIsError || byIngredientIsError) {
      throw new Error(
        `Error fetching data: ${
          byNameIsError ? byNameError?.message : byIngredientError?.message
        }`
      );
    }
  }, [byNameIsError, byNameError, byIngredientIsError, byIngredientError]);

  useEffect(() => {
    if (!navigator.onLine) {
      window.location.reload();
    }
  }, [navigator.onLine]);

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        byNameRefetch={byNameRefetch}
        byIngredientRefetch={byIngredientRefetch}
        byNameIsLoading={byNameIsLoading}
        byIngredientIsLoading={byIngredientIsLoading}
        isSearching={isSearching}
      />

      <div className='flex flex-col space-y-8 my-8'>
        <RandomMeals />
        <CategoryListing />
        <CountryListing />

        <Element name='search-result'>
          {isDoneFetching && (
            <>
              {mealsData.length === 0 && search && (
                <MaxWidthWrapper className='my-8 text-center'>
                  <small className='text-base sm:text-lg md:text-xl font-medium leading-none sm:ml-auto'>
                    No results found for{' '}
                    <span className='font-bold text-foreground'>
                      " {search} "
                    </span>
                    . Please try a different search term.
                  </small>
                </MaxWidthWrapper>
              )}
              {mealsData.length > 0 && (
                <RecipeListing
                  meals={mealsData}
                  search={search}
                  isDoneFetching={isDoneFetching}
                />
              )}
            </>
          )}
        </Element>
      </div>
    </>
  );
};

export default Home;
