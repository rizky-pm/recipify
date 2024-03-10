import { API_BASE_URL } from '@/constants';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (urlSuffix: string) => {
  const response = await fetch(`${API_BASE_URL}${urlSuffix}`);
  return response.json();
};
