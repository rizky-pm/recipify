import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import { Input } from '@/components/ui/input';
import HeaderImage from '../assets/header-image.jpg';
import RecipeListing from '@/components/RecipeListing';
import { useQuery } from '@tanstack/react-query';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { API_BASE_URL } from '@/constants';

const Home = () => {
  const [search, setSearch] = useState<string>('');

  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ['meal-by-ingredient'],
    queryFn: () =>
      fetch(`${API_BASE_URL}/filter.php?i=${search}`).then((res) => res.json()),
    enabled: false,
  });

  const scrollToResult = () => {
    scroll.scrollTo(window.innerHeight * 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      refetch();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      scrollToResult();
    }
  }, [isSuccess]);

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
          <MaxWidthWrapper>
            <h1 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-background text-center'>
              Recipify
            </h1>
            <Input
              type='text'
              placeholder='Avocado'
              className='text-center rounded-full mt-2'
              onChange={handleChange}
              onKeyDown={handleSearch}
              disabled={isLoading}
            />
          </MaxWidthWrapper>
        </div>
      </div>

      {data && <RecipeListing meals={data.meals} />}
    </>
  );
};

export default Home;
