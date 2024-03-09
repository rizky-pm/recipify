import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import TypograpyH1 from '@/components/TypograpyH1';
import { Badge } from '@/components/ui/badge';
import TypographyH3 from '@/components/TypographyH3';
import { Link2, Youtube } from 'lucide-react';
import { API_BASE_URL } from '@/constants';

const Meal = () => {
  const { mealId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['meal-detail'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <h1 className='text-center'>Loading ...</h1>
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
      <TypograpyH1 className='text-center'>{meal.strMeal}</TypograpyH1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className='my-4' />

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
