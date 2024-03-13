import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { animateScroll as scroll } from 'react-scroll';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import MaxWidthWrapper from './MaxWidthWrapper';
import { fetchData } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  meals?: Meal[];
  search?: string;
}

const RecipeListing = ({ meals, search }: Props) => {
  const [mealsData, setMealsData] = useState<Meal[]>([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { categoryName, countryName } = useParams();

  const {
    data: mealsDataFromQuery,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['meals', countryName, categoryName],
    queryFn: () => {
      let result;
      if (categoryName) {
        result = fetchData(`/filter.php?c=${categoryName}`);
      } else if (countryName) {
        result = fetchData(`/filter.php?a=${countryName}`);
      }

      return result;
    },
    enabled: false,
  });

  const handleClick = (mealId: string) => {
    navigate(`/meal/${mealId}`);
  };

  useEffect(() => {
    if (pathname !== '/') {
      scroll.scrollToTop();

      if (categoryName) document.title = `Recipify | ${categoryName}`;
      else if (countryName) document.title = `Recipify | ${countryName}`;
    }
  }, []);

  useEffect(() => {
    if (meals) {
      setMealsData(meals);
    } else {
      refetch();
    }
  }, [meals]);

  useEffect(() => {
    if (mealsDataFromQuery) {
      setMealsData(mealsDataFromQuery.meals);
    }
  }, [mealsDataFromQuery]);

  if (isLoading) {
    return (
      <MaxWidthWrapper className='mt-4 flex flex-col items-center'>
        <Skeleton className='h-6 w-2/3' />
        <Skeleton className='h-96 w-full rounded-xl mt-4' />
        <Skeleton className='h-96 w-full rounded-xl mt-8' />
        <Skeleton className='h-96 w-full rounded-xl mt-8' />
      </MaxWidthWrapper>
    );
  }

  return mealsData.length ? (
    <MaxWidthWrapper className='mt-4'>
      <div className='text-center'>
        <small className='text-base font-medium leading-none'>
          {mealsData.length} recipe(s) found{' '}
          {search && (
            <>
              for <span className='font-bold text-foreground'>"{search}"</span>
            </>
          )}
        </small>
      </div>

      {mealsData.length > 0 ? (
        <div className='flex flex-col space-y-8 mt-4'>
          {mealsData.map((meal) => (
            <Card
              key={meal.idMeal}
              onClick={() => handleClick(meal.idMeal)}
              className='cursor-pointer card-shadow'
            >
              <CardContent className='p-0'>
                <img
                  src={meal.strMealThumb}
                  alt={`Picture of ${meal.strMeal}`}
                  className='rounded-tl-md rounded-tr-md w-full h-full aspect-square'
                />
              </CardContent>
              <CardFooter className='p-4'>
                <CardTitle className='text-xl truncate'>
                  {meal.strMeal}
                </CardTitle>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : null}
    </MaxWidthWrapper>
  ) : null;
};

export default RecipeListing;
