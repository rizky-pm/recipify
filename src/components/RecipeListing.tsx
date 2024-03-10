import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MaxWidthWrapper from './MaxWidthWrapper';
import { fetchData } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  meals?: Meal[];
}

const RecipeListing = ({ meals }: Props) => {
  const [mealsData, setMealsData] = useState<any[]>([]);

  const navigate = useNavigate();
  const { categoryName } = useParams();

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchData(`/filter.php?c=${categoryName}`),
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
    if (data) {
      setMealsData(data.meals);
    }
  }, [data]);

  return (
    <MaxWidthWrapper className='mt-4'>
      <div className='text-center'>
        {mealsData ? (
          <small className='text-sm font-medium leading-none'>
            {mealsData.length} recipe(s) found
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
    </MaxWidthWrapper>
  );
};

export default RecipeListing;
