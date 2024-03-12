import { useState, useEffect } from 'react';
import { animateScroll as scroll, scroller, Element } from 'react-scroll';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import HeaderImage from '../assets/header-image.jpg';
import RecipeListing from '@/components/RecipeListing';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { API_BASE_URL } from '@/constants';
import CategoryListing from '@/components/CategoryListing';
import CountryListing from '@/components/CountryListing';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [mealsData, setMealsData] = useState([]);

  const {
    data: byNameData,
    refetch: byNameRefetch,
    isSuccess: byNameIsSuccess,
    isLoading: byNameIsLoading,
  } = useQuery({
    queryKey: ['meal-by-name'],
    queryFn: () => fetchMealData(`/search.php?s=${search}`),
    enabled: false,
  });

  const {
    data: byIngredientData,
    refetch: byIngredientRefetch,
    isSuccess: byIngredientIsSuccess,
    isLoading: byIngredientIsLoading,
  } = useQuery({
    queryKey: ['meal-by-ingredient'],
    queryFn: () => fetchMealData(`/filter.php?i=${search}`),
    enabled: false,
  });

  const fetchMealData = async (urlSuffix: string) => {
    const response = await fetch(`${API_BASE_URL}${urlSuffix}`);
    return response.json();
  };

  const scrollToResult = () => {
    scroller.scrollTo('search-result', {
      duration: 1000,
      smooth: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      byNameRefetch();
      byIngredientRefetch();
    }
  };

  useEffect(() => {
    if (byNameData && byIngredientData) {
      const meals = mergeMealData(byNameData.meals, byIngredientData.meals);
      setMealsData(meals);
      if (byNameIsSuccess && byIngredientIsSuccess) {
        scrollToResult();
      }
    }
  }, [byNameData, byIngredientData]);

  // BOOKMARK : Remove same value of array of object
  const mergeMealData = (data1: any[], data2: any[]) => {
    const uniqueIds: Record<number, boolean> = {};
    const mergedData = [...data1, ...data2].filter(({ idMeal }: any) => {
      if (!uniqueIds[idMeal]) {
        uniqueIds[idMeal] = true;
        return true;
      }
      return false;
    });
    return mergedData;
  };

  return (
    <>
      <div className='relative h-screen w-full'>
        <img
          src={HeaderImage}
          alt='Dishes on the table'
          className='object-cover object-center h-full'
        />
        <div
          aria-hidden='true'
          className='bg-zinc-900/75 w-full h-full absolute top-0 left-0 flex'
        />
        <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full'>
          <MaxWidthWrapper className='text-center'>
            <h1 className='scroll-m-20 pb-2 text-6xl font-semibold tracking-tight first:mt-0 text-background text-center'>
              Recipify
            </h1>
            <div className='flex items-center gap-2'>
              <Input
                type='text'
                placeholder='Search by ingredient or name'
                className='rounded-full text-center'
                onChange={handleChange}
                onKeyDown={handleSearch}
                disabled={byNameIsLoading && byIngredientIsLoading}
              />
            </div>
          </MaxWidthWrapper>
        </div>
      </div>

      <CategoryListing />
      <CountryListing />
      {byNameData && byIngredientData && (
        <Element name='search-result'>
          <RecipeListing meals={mealsData} search={search} />
        </Element>
      )}
    </>
  );
};

export default Home;
