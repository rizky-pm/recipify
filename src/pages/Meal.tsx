import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import TypographyH3 from '@/components/TypographyH3';
import TypographyH2 from '@/components/TypographyH2';
import TypographyH1 from '@/components/TypographyH1';
import { Link2, Youtube } from 'lucide-react';
import { API_BASE_URL } from '@/constants';

const Meal = () => {
  const { mealId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['meal-detail'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`).then((res) => res.json()),
    gcTime: 0,
  });

  const meal = data?.meals[0];

  useEffect(() => {
    if (meal) {
      document.title = `Recipify | ${meal.strMeal}`;
    }

    return () => {
      document.title = 'Recipify';
    };
  }, [meal]);

  useEffect(() => {
    scroll.scrollToTop({
      duration: 0,
      smooth: false,
    });
  }, []);

  if (isLoading) {
    return (
      <MaxWidthWrapper className='py-8'>
        <div className='flex flex-col items-center'>
          <Skeleton className='h-12 w-[250px]' />
          <Skeleton className='h-80 w-full rounded-xl mt-4' />
        </div>
        <div className='flex gap-2 mt-4'>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className='h-5 w-16' />
          ))}
        </div>
        <div className='flex flex-col space-y-2 mt-4'>
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton key={index} className='h-4 w-1/3' />
          ))}
        </div>
        <div className='flex flex-col space-y-2 mt-4'>
          {Array.from({ length: 12 }, (_, index) => (
            <Skeleton key={index} className='h-4 w-full' />
          ))}
          <br />
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className='h-4 w-full' />
          ))}
        </div>
        <div className='flex mt-4 gap-4'>
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton key={index} className='h-6 w-20' />
          ))}
        </div>
      </MaxWidthWrapper>
    );
  }

  const instruction = meal.strInstructions.split('\n').filter(Boolean);
  const tags = meal.strTags ? meal.strTags.split(',').filter(Boolean) : [];

  const ingredients = Object.entries(meal)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => ({
      ingredient: value,
      measure: meal[`strMeasure${key.replace('strIngredient', '')}`],
    }));

  return (
    <MaxWidthWrapper className='py-8'>
      <div className='flex flex-col items-center sm:items-start'>
        <TypographyH2 className='sm:hidden'>{meal.strMeal}</TypographyH2>
        <TypographyH1 className='hidden sm:block'>{meal.strMeal}</TypographyH1>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className='my-4 rounded-md h-80 sm:w-full aspect-square sm:aspect-video sm:object-cover'
        />
      </div>

      <div className='flex flex-wrap gap-2 mb-4'>
        {meal.strArea && (
          <Badge className='sm:px-4 sm:py-1 sm:text-base bg-primary/75'>
            {meal.strArea}
          </Badge>
        )}
        {meal.strCategory && (
          <Badge className='sm:px-4 sm:py-1 sm:text-base bg-primary/75'>
            {meal.strCategory}
          </Badge>
        )}
        {tags.map((tag: string, index: number) => (
          <Badge
            key={index}
            className='sm:px-4 sm:py-1 sm:text-base bg-primary/75'
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div>
        <TypographyH3 className='sm:hidden'>Ingredients</TypographyH3>
        <TypographyH2 className='hidden sm:block'>Ingredients</TypographyH2>
        <ul>
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={index}>
              {ingredient} - {measure}
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-4'>
        <TypographyH3 className='sm:hidden'>Instructions</TypographyH3>
        <TypographyH2 className='hidden sm:block'>Instructions</TypographyH2>
        {instruction.map((line: string, index: number) => (
          <p key={index} className='mb-[1em]'>
            {line}
          </p>
        ))}
      </div>

      <div className='mt-4 flex-wrap flex items-center gap-4'>
        {meal.strSource && (
          <a
            href={meal.strSource}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex gap-1 items-center text-foreground hover:text-primary transition-all'
          >
            <Link2 className='w-6 sm:w-7 h-6 sm:h-7 group-hover:text-primary transition-all' />
            <span className='group-hover:text-primary transition-all'>
              Source
            </span>
          </a>
        )}
        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex gap-1 items-center text-foreground hover:text-primary transition-all'
          >
            <Youtube className='w-6 sm:w-7 h-6 sm:h-7 group-hover:text-primary transition-all' />
            <span className='group-hover:text-primary transition-all'>
              Watch
            </span>
          </a>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Meal;
