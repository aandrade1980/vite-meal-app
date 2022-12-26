/** Hooks */
import { useQuery } from '@tanstack/react-query';

/** Types */
import { Meal } from '../types/meal';

const getMeals = async (searchValue: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
  );

  const data = await response.json();

  return data?.meals;
};

export const useMeals = (searchValue: string) => {
  return useQuery<Meal[], boolean>(
    ['meals', searchValue],
    () => getMeals(searchValue),
    {
      enabled: searchValue.length > 2,
      keepPreviousData: true,
      // stale data 15 mins
      staleTime: 900000
    }
  );
};
