import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MaxWidthWrapper from './MaxWidthWrapper';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  meals: Meal[];
}

const RecipeListing = ({ meals }: Props) => {
  const navigate = useNavigate();

  const handleClick = (mealId: string) => {
    navigate(`/meal/${mealId}`);
  };

  return (
    <MaxWidthWrapper className='mt-4'>
      <small className='text-sm font-medium leading-none'>
        {meals.length} recipe(s) found
      </small>

      <div className='flex flex-col space-y-4 mt-4'>
        {meals.map((meal) => (
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
    </MaxWidthWrapper>
  );
};

export default RecipeListing;
