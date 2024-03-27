import { useCallback, useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Skeleton } from './ui/skeleton';
import TypographyH2 from './TypographyH2';
import { MealTypes } from '@/types';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import { useQuery } from '@tanstack/react-query';
import { fetchData, mergeMealData } from '@/lib/utils';

const RandomMeals = () => {
  const [randomMealsData, setRandomMealsData] = useState<MealTypes[]>([]);

  const isMobileScreen = useMediaQuery({ maxWidth: 640 });
  const navigate = useNavigate();

  const { data: randomMealOne } = useQuery({
    queryKey: ['random-meal-one'],
    queryFn: () => fetchData('/random.php?cache=one'),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: randomMealTwo } = useQuery({
    queryKey: ['random-meal-two'],
    queryFn: () => fetchData('/random.php?cache=two'),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleClick = useCallback(
    (mealId: string) => {
      navigate(`/meal/${mealId}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (randomMealOne && randomMealTwo) {
      setRandomMealsData(
        mergeMealData(randomMealOne.meals, randomMealTwo.meals)
      );
    }
  }, [randomMealOne, randomMealTwo]);

  if (randomMealsData.length === 0) {
    return (
      <MaxWidthWrapper>
        <Skeleton className='h-8 w-[250px] mb-4' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <Skeleton className='h-72 w-full rounded-xl' />
          <Skeleton className='h-72 w-full rounded-xl' />
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <TypographyH2 className='mb-2 text-2xl lg:text-3xl'>
        Random Pick
      </TypographyH2>

      <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12'>
        {randomMealsData?.map((meal: MealTypes) => (
          <Card
            key={meal.idMeal}
            onClick={() => (isMobileScreen ? handleClick(meal.idMeal) : null)}
            className='cursor-pointer sm:cursor-default card-shadow sm:flex lg:w-2/4'
          >
            <CardContent className='p-0 h-72 sm:w-1/2'>
              <img
                src={meal.strMealThumb}
                alt={`Picture of ${meal.strMeal}`}
                className='rounded-tl-md rounded-tr-md sm:rounded-bl-md sm:rounded-tr-none w-full h-full aspect-square object-cover'
              />
            </CardContent>
            <CardFooter className='p-4 sm:py-6 sm:w-1/2 sm:flex sm:flex-col sm:justify-center sm:items-start'>
              <CardTitle className='text-xl sm:text-2xl truncate text-wrap max-h-28'>
                {meal.strMeal}
              </CardTitle>
              <div className='hidden sm:flex sm:gap-2 sm:mt-4 sm:flex-wrap'>
                <Badge variant={'secondary'} className='px-4 py-1 text-sm'>
                  {meal.strArea}
                </Badge>
                <Badge variant={'secondary'} className='px-4 py-1 text-sm'>
                  {meal.strCategory}
                </Badge>
                {meal.strTags
                  ?.split(',')
                  .filter(Boolean)
                  .map((tag: string) => (
                    <Badge
                      variant={'secondary'}
                      className='px-4 py-1 text-sm'
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
              <Button
                size={'sm'}
                onClick={() =>
                  !isMobileScreen ? handleClick(meal.idMeal) : null
                }
                className='self-end mt-auto text-sm hidden sm:block'
                aria-label='Navigate to meal recipe detail page button'
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default RandomMeals;
