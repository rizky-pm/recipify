import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { animateScroll as scroll } from 'react-scroll';
import { useMediaQuery } from 'react-responsive';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import MaxWidthWrapper from './MaxWidthWrapper';
import { fetchData } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import TypographyH1 from './TypographyH1';
import BackButton from './BackButton';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  meals?: Meal[];
  search?: string;
}

const RecipeListing: React.FC<Props> = ({ meals, search }: Props) => {
  const [mealsData, setMealsData] = useState<Meal[]>([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { categoryName, countryName } = useParams<{
    categoryName?: string;
    countryName?: string;
  }>();
  const isSmallDesktopScreen = useMediaQuery({ minWidth: 1084 });

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
      <MaxWidthWrapper className='mb-4 flex flex-col'>
        <Skeleton className='h-10 w-2/3 sm:w-1/3 xl:w-1/4 mt-4 self-center sm:self-start' />
        <Skeleton className='h-6 w-3/4 sm:w-2/4 xl:w-1/6  mt-2 self-center sm:self-start' />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 lg:grid-cols-5 my-4'>
          {Array.from({ length: isSmallDesktopScreen ? 10 : 9 }).map(
            (_, index) => (
              <Skeleton
                key={index}
                className='h-96 sm:h-60 w-full sm:w-48 rounded-md lg:h-64 lg:w-52 xl:w-56 xl:h-72'
              />
            )
          )}
        </div>
      </MaxWidthWrapper>
    );
  }

  return mealsData.length ? (
    <MaxWidthWrapper className='my-4'>
      <div className='text-center sm:text-left recipe-listing-navigation -ml-12'>
        <BackButton className='back-btn' />
        <TypographyH1 className='title '>
          {countryName || categoryName}
        </TypographyH1>
        <small className='text-base sm:text-xl font-medium leading-none subtitle'>
          {mealsData.length} recipe(s) found{' '}
          {search && (
            <>
              for <span className='font-bold text-foreground'>"{search}"</span>
            </>
          )}
        </small>
      </div>

      {mealsData.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4'>
          {mealsData.map((meal) => (
            <Card
              key={meal.idMeal}
              onClick={() => handleClick(meal.idMeal)}
              className='cursor-pointer card-shadow lg:w-54'
            >
              <CardContent className='p-0'>
                <img
                  src={meal.strMealThumb}
                  alt={`Picture of ${meal.strMeal}`}
                  className='rounded-tl-md rounded-tr-md w-full sm:w-48 lg:w-full h-full aspect-square object-cover'
                />
              </CardContent>
              <CardFooter className='p-4'>
                <CardTitle className='text-base sm:text-sm truncate'>
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
