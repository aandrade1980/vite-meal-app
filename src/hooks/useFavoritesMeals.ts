/** Hooks */
import { useQuery } from 'react-query';

/** Service */
import { supabaseClient } from '../service/supabase';

const getIsFavoriteMeal = async (mealId: string) => {
  const { count } = await supabaseClient
    .from('favorites_meals')
    .select('meal_id', { count: 'exact', head: true })
    .eq('meal_id', mealId);

  return !!count;
};

export const useIsFavoriteMeal = (mealId: string) => {
  const { data, error, isLoading, refetch } = useQuery(
    ['isFavorite', mealId],
    () => getIsFavoriteMeal(mealId),
    {
      enabled: !!mealId
    }
  );

  return { isFavorite: data, error, isLoadingFavorite: isLoading, refetch };
};
