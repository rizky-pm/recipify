import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import TypographyH3 from '@/components/TypographyH3';
import TypographyH2 from '@/components/TypographyH2';
import TypographyH1 from '@/components/TypographyH1';
import { ChevronLeft, Link2, Youtube } from 'lucide-react';
import { API_BASE_URL } from '@/constants';
import { MealTypes } from '@/types';
import NotFound from '@/components/NotFound';

const Meal = () => {
  const [mealData, setMealData] = useState<MealTypes | null>(null);
  const { mealId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['meal-detail'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`).then((res) => res.json()),
    gcTime: 0,
  });

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (data) {
      if (data.meals !== null) {
        setMealData(data.meals[0]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (mealData) {
      document.title = `Recipify | ${mealData?.strMeal}`;
    } else {
      document.title = `Recipify | Meal not found`;
    }

    return () => {
      document.title = 'Recipify';
    };
  }, [mealData]);

  useEffect(() => {
    scroll.scrollToTop({
      duration: 0,
      smooth: false,
    });
  }, []);

  if (!mealData && isSuccess) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <MaxWidthWrapper className='py-8'>
        <div className='flex flex-col items-center sm:items-start'>
          <Skeleton className='h-12 w-[250px] lg:w-1/3' />
          <Skeleton className='h-80 lg:h-96 w-full rounded-xl mt-4' />
        </div>
        <div className='flex gap-2 mt-4'>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className='h-8 w-20 rounded-full' />
          ))}
        </div>
        <div className='flex flex-col space-y-2 mt-4'>
          <Skeleton className='h-6 w-2/4 sm:w-1/3 lg:w-1/6' />
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton key={index} className='h-4 w-1/4 lg:w-1/12' />
          ))}
        </div>
        <div className='flex flex-col space-y-2 mt-8'>
          <Skeleton className='h-6 w-2/4 sm:w-1/3 lg:w-1/6' />
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

  const instruction = mealData?.strInstructions?.split('\n').filter(Boolean);
  const tags = mealData?.strTags
    ? mealData?.strTags.split(',').filter(Boolean)
    : [];

  const ingredients = Object.entries(mealData || {})
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => ({
      ingredient: value,
      measure:
        mealData![
          `strMeasure${key.replace('strIngredient', '')}` as keyof MealTypes
        ],
    }));

  return (
    <MaxWidthWrapper className='py-4'>
      <div className='flex flex-col mt-4'>
        <div className='flex space-x-2 items-center'>
          <div
            className='rounded-full hover:bg-accent transition-all cursor-pointer'
            onClick={handleBackButton}
          >
            <ChevronLeft className='w-12 h-12' />
          </div>
          <TypographyH1 className='text-center sm:text-left'>
            {mealData?.strMeal}
          </TypographyH1>
        </div>
        <img
          src={mealData?.strMealThumb}
          alt={mealData?.strMeal}
          className='my-4 rounded-md h-80 lg:h-96 sm:w-full aspect-square sm:aspect-video sm:object-cover'
        />
      </div>

      <div className='flex flex-wrap gap-2 mb-4'>
        {mealData?.strArea && (
          <Badge className='sm:px-4 sm:py-1 sm:text-base bg-primary/75'>
            {mealData?.strArea}
          </Badge>
        )}
        {mealData?.strCategory && (
          <Badge className='sm:px-4 sm:py-1 sm:text-base bg-primary/75'>
            {mealData?.strCategory}
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
        {instruction?.map((line: string, index: number) => (
          <p key={index} className='mb-[1em]'>
            {line}
          </p>
        ))}
      </div>

      <div className='mt-4 flex-wrap flex items-center gap-4'>
        {mealData?.strSource && (
          <a
            href={mealData?.strSource}
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
        {mealData?.strYoutube && (
          <a
            href={mealData?.strYoutube}
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
