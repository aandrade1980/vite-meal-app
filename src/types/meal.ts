import { z } from "zod";

const mealSchema = z.object({
  idMeal: z.string(),
  strCategory: z.string().optional(),
  strIngredient1: z.string().optional(),
  strIngredient2: z.string().optional(),
  strIngredient3: z.string().optional(),
  strIngredient4: z.string().optional(),
  strIngredient5: z.string().optional(),
  strIngredient6: z.string().optional(),
  strIngredient7: z.string().optional(),
  strIngredient8: z.string().optional(),
  strIngredient9: z.string().optional(),
  strInstructions: z.string(),
  strMeal: z.string(),
  strMealThumb: z.string(),
  strTags: z.string(),
  strYoutube: z.string()
})

export type Meal = z.infer<typeof mealSchema>;

// TODO: remove after testing...

// export type Meal = {
//   idMeal: string;
//   strArea: string;
//   strCategory: string;
//   strIngredient1: string;
//   strIngredient2: string;
//   strIngredient3: string;
//   strIngredient4: string;
//   strIngredient5: string;
//   strIngredient6: string;
//   strIngredient7: string;
//   strIngredient8: string;
//   strIngredient9: string;
//   strInstructions: string;
//   strMeal: string;
//   strMealThumb: string;
//   strMeasure1: string;
//   strMeasure2: string;
//   strMeasure3: string;
//   strMeasure4: string;
//   strMeasure5: string;
//   strMeasure6: string;
//   strMeasure7: string;
//   strMeasure8: string;
//   strMeasure9: string;
//   strSource: string;
//   strTags: string;
//   strYoutube: string;
// };
