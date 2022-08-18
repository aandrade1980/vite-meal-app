import { useQuery } from 'react-query';
import axios from 'axios';
import { Meal } from '../types/meal';

const getMeals = async (searchValue: string) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
  );
  return data?.meals;
};

export default function useMeals(searchValue: string) {
  return useQuery<Meal[], boolean>(
    ['meals', searchValue],
    () => getMeals(searchValue),
    {
      enabled: searchValue.length > 2,
      refetchOnWindowFocus: false
    }
  );
}
