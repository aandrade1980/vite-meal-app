/** Hooks */
import { useQuery } from 'react-query';

/**Types */
import { Meal } from '../types/meal';

const getMeal = async (mealID: string | undefined) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );

  const data = await response.json();

  return data.meals[0] as Meal;
};

export const useMeal = (mealID: string | undefined) => {
  return useQuery<Meal, boolean>(['meal', mealID], () => getMeal(mealID), {
    enabled: !!mealID,
    // stale data 15 mins
    staleTime: 900000
  });
};
