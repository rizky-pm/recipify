import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import TypographyH1 from '@/components/TypographyH1';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import TypographyH3 from '@/components/TypographyH3';
import { Link2, Youtube } from 'lucide-react';
import { API_BASE_URL } from '@/constants';
import TypographyH2 from '@/components/TypographyH2';

const Meal = () => {
  const { mealId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['meal-detail'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <MaxWidthWrapper className='py-8'>
        <div className='flex flex-col items-center'>
          <Skeleton className='h-12 w-[250px]' />
          <Skeleton className='h-80 w-full rounded-xl mt-4' />
        </div>
        <div className='flex gap-2 mt-4'>
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-16' />
        </div>
        <div className='flex flex-col space-y-2 mt-4'>
          <Skeleton className='h-8 w-2/4' />
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-4 w-1/3' />
          <Skeleton className='h-4 w-1/3' />
        </div>

        <div className='flex flex-col space-y-2 mt-4'>
          <Skeleton className='h-8 w-2/4' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />

          <br />

          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
        </div>

        <div className='flex mt-4 gap-4'>
          <Skeleton className='h-6 w-20' />
          <Skeleton className='h-6 w-20' />
        </div>
      </MaxWidthWrapper>
    );
  }

  const meal = data?.meals[0];

  const instruction = meal.strInstructions.split('\n');
  const tags = meal.strTags ? meal.strTags.split(',').filter(Boolean) : [];

  const ingredients = Object.entries(meal)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => ({
      ingredient: value,
      measure: meal[`strMeasure${key.replace('strIngredient', '')}`],
    }));

  return (
    <MaxWidthWrapper className='py-8'>
      <div className='flex flex-col items-center'>
        <TypographyH2 className='text-center'>{meal.strMeal}</TypographyH2>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className='my-4 rounded-xl h-80 aspect-square'
        />
      </div>

      <div className='flex flex-wrap gap-2 mb-4'>
        <Badge>Seafood</Badge>
        <Badge>British</Badge>
        {tags.map((tag: string) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div>
        <TypographyH3>Ingredients</TypographyH3>
        <ul>
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={index}>
              {ingredient} - {measure}
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-4'>
        <TypographyH3>Instructions</TypographyH3>
        {instruction.map((line: string, index: number) => (
          <p key={index} className='mb-[1em]'>
            {line}
          </p>
        ))}
      </div>

      <div className='mt-4 flex-wrap flex items-center gap-4'>
        <a
          href={data.meals[0].strSource}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex gap-1 items-center text-foreground hover:text-primary transition-all'
        >
          <Link2 className='w-6 h-6 group-hover:text-primary transition-all' />
          <span className='group-hover:text-primary transition-all'>
            Source
          </span>
        </a>
        <a
          href={data.meals[0].strYoutube}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex gap-1 items-center text-foreground hover:text-primary transition-all'
        >
          <Youtube className='w-6 h-6 group-hover:text-primary transition-all' />
          <span className='group-hover:text-primary transition-all'>Watch</span>
        </a>
      </div>
    </MaxWidthWrapper>
  );
};

export default Meal;
