/** Hooks */
import { useQuery } from '@tanstack/react-query';

/** Service */
import { supabaseClient } from '../service/supabase';

const getIsFavoriteMeal = async (mealId: string, userId: string) => {
  const { count } = await supabaseClient
    .from('favorites_meals')
    .select('meal_id', { count: 'exact', head: true })
    .filter('user_id', 'eq', userId)
    .eq('meal_id', mealId);

  return !!count;
};

export const useIsFavoriteMeal = (mealId: string, userId: string) => {
  const { data, error, isLoading, refetch } = useQuery(
    ['isFavorite', mealId, userId],
    () => getIsFavoriteMeal(mealId, userId),
    {
      enabled: !!mealId && !!userId
    }
  );

  return { isFavorite: data, error, isLoadingFavorite: isLoading, refetch };
};
