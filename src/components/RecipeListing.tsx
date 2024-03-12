import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MaxWidthWrapper from './MaxWidthWrapper';
import { fetchData } from '@/lib/utils';
import { useEffect, useState } from 'react';
import TypograpyH1 from './TypograpyH1';

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
  const [mealsData, setMealsData] = useState<any[]>([]);

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

  return (
    <MaxWidthWrapper className='mt-4'>
      {isLoading ? (
        <TypograpyH1>Loading ...</TypograpyH1>
      ) : (
        <>
          <div className='text-center mt-8'>
            {mealsData ? (
              <small className='text-base font-medium leading-none'>
                {mealsData.length} recipe(s) found for{' '}
                <span className='font-bold text-foreground'>"{search}"</span>
              </small>
            ) : null}
          </div>

          {mealsData.length > 0 ? (
            <div className='flex flex-col space-y-4 mt-4'>
              {mealsData.map((meal) => (
                <Card
                  key={meal.idMeal}
                  onClick={() => handleClick(meal.idMeal)}
                  className='cursor-pointer'
                >
                  <CardHeader>
                    <CardTitle className='text-xl'>{meal.strMeal}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex justify-center'>
                    <img
                      src={meal.strMealThumb}
                      alt={`Picture of ${meal.strMeal}`}
                      className='rounded-md'
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default RecipeListing;
