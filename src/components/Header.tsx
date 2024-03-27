import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { QueryObserverResult } from '@tanstack/react-query';
import { scroller } from 'react-scroll';

import HeaderImage from '../assets/header-image.png';
import MaxWidthWrapper from './MaxWidthWrapper';
import Logo from './Logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SearchTermValidator,
  TSearchTermValidator,
} from '@/lib/validators/search-validator';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  byNameRefetch: () => Promise<QueryObserverResult>;
  byIngredientRefetch: () => Promise<QueryObserverResult>;
  byNameIsLoading: boolean;
  byIngredientIsLoading: boolean;
  isSearching: boolean;
}

const scrollToResult = () => {
  scroller.scrollTo('search-result', {
    duration: 1000,
    smooth: true,
  });
};

const Header = ({
  search,
  setSearch,
  byNameRefetch,
  byIngredientRefetch,
  byNameIsLoading,
  byIngredientIsLoading,
  isSearching,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSearchTermValidator>({
    resolver: zodResolver(SearchTermValidator),
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSearch = async () => {
    if (search !== '') {
      const res1 = await byNameRefetch();
      const res2 = await byIngredientRefetch();

      if (res1.status === 'success' && res2.status === 'success') {
        scrollToResult();
      }
    }
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleSearch(); // Call your search function
  };

  return (
    <header className='relative h-screen w-full'>
      <img
        src={HeaderImage}
        alt='Dishes on the table'
        className='object-cover h-full w-full'
      />
      <div
        aria-hidden='true'
        className='bg-zinc-900/75 w-full h-full absolute top-0 left-0 flex'
      />
      <div className='absolute top-1/2 left-0 -translate-y-1/2 w-full'>
        <MaxWidthWrapper className='lg:max-w-screen-lg flex flex-col'>
          <Logo />
          <form
            onSubmit={handleSubmitSearch}
            className='flex items-center gap-2 mt-8 sm:justify-center'
          >
            <div className='w-full grid grid-cols-10 grid-rows-2 gap-2 grid-areas-custom-layout'>
              <Input
                {...register('search')}
                type='text'
                placeholder='Search by ingredient or name'
                className={cn(
                  { 'focus-visible:ring-red-500': errors.search },
                  'rounded-full text-center sm:text-left sm:h-14 sm:px-8 transition-all grid-area-input col-span-8 sm:col-span-9 text-xs sm:text-lg'
                )}
                onChange={handleChange}
                disabled={byNameIsLoading && byIngredientIsLoading}
              />
              <Button
                aria-label='Search button'
                className='sm:h-14 grid-area-btn col-span-2 sm:col-span-1 rounded-full'
                disabled={isSearching}
                type='submit'
              >
                {isSearching ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-loader-circle animate-spin sm:w-8 sm:h-8'
                  >
                    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
                  </svg>
                ) : (
                  <Search className='sm:w-8 sm:h-8' />
                )}
              </Button>
              {errors?.search && (
                <p className='text-red-500 text-xs text-center sm:text-base sm:text-left sm:px-8 font-medium grid-area-error-msg col-span-8 sm:col-span-9'>
                  {errors.search.message}
                </p>
              )}
            </div>
          </form>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default Header;
