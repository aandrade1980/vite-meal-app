import { FC } from 'react';

/** Components */
import { Card, Grid, Text } from '@nextui-org/react';
import { Link } from 'react-router-dom';

/** Types */
import { Meal } from '../types/meal';

type MealCard = Pick<Meal, 'idMeal' | 'strMealThumb' | 'strMeal'>;

export const MealCard: FC<MealCard> = ({ idMeal, strMealThumb, strMeal }) => (
  <Grid key={idMeal} xs={6} sm={4} md={3}>
    <Link to={`/${idMeal}`} key={idMeal}>
      <Card isHoverable isPressable>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            objectFit="cover"
            src={strMealThumb}
            height={320}
            width="100%"
            alt={strMeal}
          />
        </Card.Body>
        <Card.Footer>
          <Text b>
            {strMeal.length > 35 ? strMeal.substring(0, 32) + '...' : strMeal}
          </Text>
        </Card.Footer>
      </Card>
    </Link>
  </Grid>
);
