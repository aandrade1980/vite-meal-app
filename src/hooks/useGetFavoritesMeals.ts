/** Hooks */
import { useQuery } from 'react-query';

/** Service */
import { supabaseClient } from '../service/supabase';

const getFavoritesMeals = async (userId: string | undefined) => {
  const { data: favoritesMeals } = await supabaseClient
    .from('favorites_meals')
    .select('meal_id')
    .filter('user_id', 'eq', userId);

  // console.log('favoritesMeals => ', favoritesMeals)


  const { data, error } = await supabaseClient
    .from('meals')
    .select('meal_id, name, category, image')
    .in('meal_id', favoritesMeals?.map(meal => meal.meal_id) as [])

  return { data, error };
};

export const useGetFavoritesMeals = (userId: string | undefined) => {
  const { data, error, isLoading, refetch } = useQuery(
    ['getFavorites', userId],
    () => getFavoritesMeals(userId),
    {
      enabled: Boolean(userId),
    }
  );

  return { meals: data, error, isLoadingFavoritesMeals: isLoading, refetch };
};
