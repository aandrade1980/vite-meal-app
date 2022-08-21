/** Hooks */
import { useAuth } from '../context/AuthContext';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMeal from '../hooks/useMeal';
import { useIsFavoriteMeal } from '../hooks/useFavoritesMeals';

/** Components */
import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Image,
  Link,
  Loading,
  Row,
  Text
} from '@nextui-org/react';
import { toast } from 'react-toastify';

/** Icons */
import { IoMdArrowBack } from 'react-icons/io';
import { AiFillYoutube } from 'react-icons/ai';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

/** Service */
import { supabaseClient } from '../service/supabase';

export function Meal() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: meal, isFetching } = useMeal(params.id);

  const { isFavorite, isLoadingFavorite, refetch } = useIsFavoriteMeal(
    params.id as string
  );

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

  const handleFavorite = async () => {
    if (isFavorite) {
      const { error: removeFavoriteError } = await supabaseClient
        .from('favorites_meals')
        .delete()
        .match({ meal_id: meal?.idMeal });

      if (removeFavoriteError) {
        console.error(removeFavoriteError);
        toast.error('Error removing favorite', { theme: 'colored' });
      } else {
        toast.success('Meal removed from favorites!', { theme: 'colored' });
      }
    } else {
      const { data, error } = await supabaseClient
        .from('favorites_meals')
        .insert({
          user_id: user?.uid,
          meal_id: meal?.idMeal
        });

      if (data) {
        toast.success('Meal marked as favorite!', { theme: 'colored' });
      }

      if (error && error.code === '23505') {
        toast.error('Meal already marked as favorite!', { theme: 'colored' });
      }
    }

    refetch();
  };

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

  const hasYoutubeLink = meal?.strYoutube;

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
            <Row>
              <Col css={{ display: 'flex', alignItems: 'center' }}>
                <Text h3 css={{ mr: 16 }}>
                  {meal?.strMeal}
                </Text>
                {renderTags}
              </Col>
              <Col
                css={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexBasis: '15%'
                }}
              >
                {!isLoadingFavorite && (
                  <Button
                    auto
                    shadow
                    color="error"
                    icon={
                      isFavorite ? (
                        <BsHeartFill fill="currentColor" />
                      ) : (
                        <BsHeart fill="currentColor" />
                      )
                    }
                    onPress={handleFavorite}
                  >
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  </Button>
                )}
              </Col>
            </Row>
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
              <Grid xs={hasYoutubeLink ? 9 : 10} direction="column">
                <h5>Instructions:</h5>
                <Text>{meal?.strInstructions}</Text>
              </Grid>
              {hasYoutubeLink && (
                <Grid xs={1}>
                  <Text css={{ mt: 32 }}>
                    <Link
                      color="error"
                      href={hasYoutubeLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AiFillYoutube size={32} />
                    </Link>
                  </Text>
                </Grid>
              )}
            </Grid.Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
