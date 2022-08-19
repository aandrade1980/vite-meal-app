import { useMemo } from 'react';
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Link,
  Loading,
  Text
} from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';

import useMeal from '../hooks/useMeal';

import { IoMdArrowBack } from 'react-icons/io';
import { AiFillYoutube } from 'react-icons/ai';

export function Meal() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: meal, isFetching } = useMeal(params.id);

  const handleOnBack = () => navigate('/');

  const renderIngredients = useMemo(() => {
    let ingredientsList: string[] = [];

    Object.entries(meal || {}).forEach(([key, value]) => {
      if (key.startsWith('strIngredient') && value) {
        ingredientsList.push(value);
      }
    });

    return ingredientsList.map((ingredient, index) => (
      <Text key={`${ingredient}-${index}`}>- {ingredient}</Text>
    ));
  }, [meal]);

  const renderTags = useMemo(
    () => (
      <>
        {meal?.strTags?.split(',').map((tag, index) => (
          <Text as="span" key={`${tag}-${index}`} css={{ mr: 8 }}>
            #{tag}
          </Text>
        ))}
      </>
    ),
    [meal]
  );

  if (isFetching) {
    return (
      <Container
        display="flex"
        justify="center"
        alignItems="center"
        css={{ height: '100vh' }}
      >
        <Loading size="xl" />;
      </Container>
    );
  }

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12}>
        <Button
          light
          color="primary"
          auto
          icon={<IoMdArrowBack fill="currentColor" />}
          onPress={handleOnBack}
        >
          Back
        </Button>
      </Grid>
      <Grid xs={12} md={8}>
        <Card>
          <Card.Header>
            <>
              <Text h3 css={{ mr: 16 }}>
                {meal?.strMeal}
              </Text>
              {renderTags}
            </>
          </Card.Header>
          <Card.Body>
            <Image
              width={450}
              height={450}
              src={meal?.strMealThumb as string}
              alt={meal?.strMeal as string}
              objectFit="cover"
            />
            <Grid.Container css={{ mt: 8 }} gap={2}>
              <Grid xs={2} direction="column">
                <h5>Ingredients:</h5>
                {renderIngredients}
              </Grid>
              <Grid xs={9} direction="column">
                <h5>Instructions:</h5>
                <Text>{meal?.strInstructions}</Text>
              </Grid>
              <Grid xs={1}>
                <Text css={{ mt: 32 }}>
                  <Link
                    color="error"
                    href={meal?.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillYoutube size={32} />
                  </Link>
                </Text>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
