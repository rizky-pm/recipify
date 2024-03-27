import { API_BASE_URL } from "@/constants";
import { MealTypes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (urlSuffix: string) => {
  const response = await fetch(`${API_BASE_URL}${urlSuffix}`);
  return response.json();
};

export const mergeMealData = (
  data1: MealTypes[] | null,
  data2: MealTypes[] | null
): MealTypes[] => {
  if (!data1 && !data2) return [];

  const uniqueIds: Record<string, boolean> = {};
  const mergedData: MealTypes[] = [];

  // Merge data from data1
  if (data1) {
    data1.forEach((meal) => {
      if (!uniqueIds[meal.idMeal]) {
        uniqueIds[meal.idMeal] = true;
        mergedData.push(meal);
      }
    });
  }

  // Merge data from data2
  if (data2) {
    data2.forEach((meal) => {
      if (!uniqueIds[meal.idMeal]) {
        uniqueIds[meal.idMeal] = true;
        mergedData.push(meal);
      }
    });
  }

  return mergedData;
};
