import { useQuery } from 'react-query';
import axios from 'axios';
import { Meal } from '../types/meal';

const getMeal = async (mealID: string | undefined) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );

  return data?.meals[0] as Meal;
};

export default function useMeal(mealID: string | undefined) {
  return useQuery<Meal, boolean>(['meal', mealID], () => getMeal(mealID), {
    enabled: !!mealID
  });
}
